<template>
  <div>
    <gmap-map
      :center="{ lat: 39.933049, lng: 32.858912 }"
      :zoom="6"
      :options="mapOptions"
      style="width: 100%; height: 290px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="toggleInfoWindow(m, index)"
        :option="MarkerOptions"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentLocation: {},
    locations: [
      { locationName: 'hahaha', latitude: 14.4386654, longitude: 101.3700541 },
    ],
  }),
  mounted() {
    this.initialize()
  },
  created() {},
  methods: {
    async initialize() {
      await this.$fire.firestore
        .collection('mission')
        .orderBy('startTimeStamp')
        .get()
        .then((docs) => {
          docs.docs.forEach((value, index) => {
            this.locations.push({
              locationName: value.data().locationName,
              latitude: value.data().latLng.latitude,
              longitude: value.data().latLng.longitude,
            })
          })

          console.log('this location: => ', this.locations)
        })
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
</style>
