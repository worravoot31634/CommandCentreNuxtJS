<template>
  <div style="height: 100%">
    <v-overlay :value="isLoading" opacity="0.7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <GmapMap
      ref="mapRef"
      :center="{ lat: 14.4386654, lng: 101.3722428 }"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker
        v-for="(m, index) in locations"
        :key="index"
        :ref="`marker${index}`"
        :position="{ lat: m.latitude, lng: m.longitude }"
        :icon="{
          url: require('../assets/images/marker.svg'),
          scaledSize: { width: 65, height: 65 },
        }"
      >
        <gmap-info-window
          :options="infoOptions"
          :position="{ lat: m.latitude, lng: m.longitude }"
          @closeclick="false"
        >
          <v-img
            :src="m.imgSrc"
            max-width="150"
            width="140px"
            class="align-content-center"
          />
          <v-list-item class="px-0 py-0" min-height="0">
            <div
              :class="
                'pa-2 ' + m.severityColor + ' rounded-circle d-inline-block'
              "
            ></div>
            <v-card-title
              :class="'pt-0 pb-0 px-1 ' + m.severityColor + '--text subtitle-1'"
            >
              {{ m.severity }}
            </v-card-title>
          </v-list-item>
          <v-list-item-group>
            <v-card-title
              class="px-0 py-0"
              style="font-family: Prompt; font-size: 0.7rem"
              >{{ m.locationName }}</v-card-title
            >
            <v-card-subtitle
              class="pt-3 px-0"
              style="font-family: Prompt; font-size: 9px"
              >{{ m.situationTime }}</v-card-subtitle
            >
          </v-list-item-group>
        </gmap-info-window>
      </GmapMarker>
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  components: {},
  data() {
    return {
      currentLocation: {},
      marker: undefined,
      i: 0,
      locations: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -5,
        },
      },
      content: '',
      isLoading: true,
    }
  },
  computed: {
    google: gmapApi,
  },
  mounted() {
    this.getMission()
  },
  created() {},
  methods: {
    convertDateTime(microsecond) {
      const date = new Date(microsecond)
      const dateLocal = date.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      return dateLocal
    },
    async getMission() {
      try {
        let situationTime = ''
        await this.$fire.firestore
          .collection('mission')
          .where('missionStatus', '==', 0)
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              const missionDocs = change.doc.data()

              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())

                situationTime = missionDocs.startTimeStamp.toDate().getTime()
                this.locations.push({
                  locationName: missionDocs.locationName,
                  latitude: missionDocs.latLng.latitude,
                  longitude: missionDocs.latLng.longitude,
                  imgSrc: missionDocs.imgSrc,
                  severity:
                    missionDocs.severity !== 0 ? 'รุนแรงมาก' : 'รุนแรงน้อย',
                  severityColor: missionDocs.severity !== 0 ? 'red' : 'orange',
                  situationTime: this.convertDateTime(situationTime),
                })

                this.isLoading = false
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
              }

              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())
                const indexChange = this.locations.findIndex(
                  (loc) => loc.imgSrc === change.doc.data().imgSrc
                )

                this.locations.splice(indexChange, 1)
                this.isLoading = false
              }
            })
          })
      } catch (error) {
        console.log('Error Get Mission Info: ', error)
      }
    },
  },
}
</script>
<style>
.GMap__Wrapper {
  width: 100%;
  height: 100%;
}
.GMap,
p {
  width: 100%;
  height: 100%;
  position: absolute;
}
.vue-map-container .gm-ui-hover-effect {
  display: none !important;
}
</style>
