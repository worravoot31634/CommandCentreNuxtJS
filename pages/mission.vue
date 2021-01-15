<template>
  <v-container class="pa-6">
    <v-card>
      <v-container class="pa-6">
        <v-container class="justify-center">
          <v-row class="justify-center pa-2" dense>
            <v-col cols="11">
              <h2><v-icon>mdi-chart-bubble</v-icon> ภารกิจทั้งหมด</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <!-- List -->
      <v-row class="justify-center" dense>
        <v-col cols="11">
          <v-container
            v-for="(item, i) in items"
            :key="i"
            :class="`rounded-xl`"
            class="pt-3"
            justify-center
            ><v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 8 : 4"
                  class="mx-auto transition-swing"
                  style="cursor: pointer"
                  :color="item.color"
                  @click="getIndex(i)"
                >
                  <v-row no-gutters style="flex-wrap: nowrap">
                    <v-col
                      cols="2"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100%;
                      "
                      class="flex-grow-0 flex-shrink-0"
                    >
                      <v-card style="height: 100%" fluid>
                        <!-- IMAGE -->
                        <v-img
                          :src="item.img"
                          style="min-height: 100%; height: 100%"
                        />
                      </v-card>
                    </v-col>
                    <v-col
                      cols="6"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100%;
                      "
                      class="flex-grow-1 flex-shrink-0"
                    >
                      <div fluid>
                        <v-card-title class="text-h5"
                          ><v-icon color="red"
                            >mdi-checkbox-blank-circle</v-icon
                          >
                          {{ item.level }}</v-card-title
                        >
                        <v-card-text
                          class="text-h6"
                          v-text="item.locationName"
                        ></v-card-text>

                        <!-- report time -->
                        <v-card-text v-text="item.reportTime"></v-card-text>
                      </div>
                    </v-col>
                    <v-col
                      cols="1"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100%;
                        height: 100%;
                      "
                      class="flex-grow-0 flex-shrink-1"
                    >
                      <div fluid>
                        <v-btn class="ml-2 mt-3" fab icon>
                          <v-icon>mdi-file-chart</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-hover>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://img.theculturetrip.com/wp-content/uploads/2018/03/3429990505_a91577428a_b.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.42 น.',
      },
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่3',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.32 น.',
      },
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่2',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.42 น.',
      },
      {
        color: 'white',
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่3',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.32 น.',
      },
    ],
  }),
  methods: {
    getIndex(index) {
      console.log('iondex is ' + index)
    },
  },
}
</script>
