<template>
  <v-card class="mx-auto">
    <v-container class="row justify-center row--dense">
      <v-row class="justify-center pa-4" dense
        ><v-col cols="11"> <h2>ภารกิจทั้งหมด</h2> </v-col>
      </v-row>
    </v-container>
    <v-row class="justify-center" dense>
      <!-- List -->
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="11"
        :class="`rounded-lg`"
        class="pa-4 text-center text-no-wrap"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <row class="row justify-left">
              <v-col cols="12">
                <v-card :elevation="hover ? 8 : 4" class="mx-auto">
                  <row class="row justify-left">
                    <v-col cols="3">
                      <v-avatar class="ma-1" size="125" tile>
                        <v-img :src="item.src"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="6">
                      <v-avatar class="ma-1" size="125" tile>
                        <v-img :src="item.src"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="1"> BTN </v-col>
                  </row>
                </v-card>
              </v-col>
            </row>
          </template>
        </v-hover>
      </v-col>
    </v-row>
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
