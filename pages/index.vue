<template>
  <div style="height: 100%">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 14.4386654, lng: 101.3722428 }"
      :zoom="9"
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
          scaledSize: { width: 80, height: 80 },
        }"
      >
        <gmap-info-window
          :options="infoOptions"
          :position="{ lat: m.latitude, lng: m.longitude }"
          :opened="infoOpened"
          :content="content"
          @closeclick="false"
        >
          <v-img
            :src="m.imgSrc"
            max-width="200"
            width="100%"
            height="150"
            class="align-content-center"
          />
          <v-list-item class="px-0 py-0" min-height="0">
            <div class="pa-2 red rounded-circle d-inline-block"></div>
            <v-card-title class="pt-0 pb-0 px-1 red--text subtitle-1">
              รุนแรงมาก
            </v-card-title>
          </v-list-item>
          <v-list-item-group>
            <v-card-title class="px-0 py-0">{{ m.locationName }}</v-card-title>
            <v-card-subtitle class="pt-3 px-0">{{
              m.situationTime
            }}</v-card-subtitle>
          </v-list-item-group>
        </gmap-info-window>
      </GmapMarker>
      />
    </GmapMap>
    {{ content }}
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  data() {
    return {
      currentLocation: {},
      marker: undefined,
      situationTime: '30 กันยายน 2020 Time 15:52',
      i: 0,
      isLoading: false,
      locations: [],
      infoOpened: true,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -5,
        },
      },
      content: '',
    }
  },
  computed: {
    google: gmapApi,
  },
  mounted() {
    this.initialize()
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
    async initialize() {
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
                  situationTime: this.convertDateTime(situationTime),
                })
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
              }

              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())
                const indexChange = this.locations.findIndex(
                  (loc) => loc.imgSrc === change.doc.data()
                )
                this.locations.splice(indexChange, 1)
              }
            })
          })
      } catch (error) {}
    },
    getData(data) {
      console.log(data)
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
/* .theme--light.v-application {
  background-color: #68783c;
} */
/* .navTitle {
  height: 64px;
} */
.vue-map-container .gm-ui-hover-effect {
  display: none !important;
}
</style>
