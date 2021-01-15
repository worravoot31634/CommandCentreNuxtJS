<template>
  <GMap
    ref="gMap"
    language="th"
    :center="{ lat: locations[0].latitude, lng: locations[0].longitude }"
    :options="{ fullscreenControl: true }"
    :zoom="15"
  >
    <GMapMarker
      v-for="(location, index) in locations"
      :key="index"
      :position="{
        lat: locations[index].latitude,
        lng: locations[index].longitude,
      }"
      @click="currentLocation = location[index]"
    >
      <GMapInfoWindow :options="{ maxWidth: 300 }">
        <code>
          <vs-container fill-height fluid>
            <vs-row align="center" justify="center">
              <img
                :src="'https://www.elephantnaturepark.org/wp-content/uploads/2020/04/94351084_2570825139826450_7563146999747313664_n-600x374.jpg'"
                :width="100"
                :height="100"
              />
            </vs-row>
            <vs-row><i class="bx bxs-donate-heart"></i></vs-row>
            <vs-row align="center" justify="center">
              Location Name: {{ locations[index].locationName }}
            </vs-row>
            <vs-row align="center" justify="center">
              Lat: {{ locations[index].latitude }}
            </vs-row>
            <vs-row align="center" justify="center">
              Lng: {{ locations[index].longitude }}
            </vs-row>
          </vs-container>
        </code>
      </GMapInfoWindow>
    </GMapMarker>
    <!-- <GMapCircle :options="circleOptions" /> -->
  </GMap>
</template>

<script>
export default {
  data: () => ({
    currentLocation: {},
    locations: [
      {
        locationName: '',
        latitude: 14.5347161,
        longitude: 101.3934069,
      },
    ],
  }),
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
