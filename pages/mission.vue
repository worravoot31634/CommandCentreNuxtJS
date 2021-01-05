<template>
  <v-card class="mx-auto">
    <v-container class="row justify-center row--dense">
      <v-col cols="11"> <h2>ภารกิจทั้งหมด</h2></v-col>
      <v-row class="justify-center" dense>
        <v-col v-for="(item, i) in items" :key="i" cols="11">
          <v-card :color="item.color">
            <div class="d-flex flex-no-wrap justify-space-left">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.locationName"
                ></v-card-title>
                <v-card-subtitle v-text="item.reportTime"></v-card-subtitle>
                <v-card-text> Hello</v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่2',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.42 น.',
      },
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่3',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.32 น.',
      },
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่2',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.42 น.',
      },
      {
        color: 'white',
        src:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่3',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.32 น.',
      },
    ],
  }),
}
</script>
