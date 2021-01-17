<template>
  <v-container fluid>
    <v-card style="margin: 2%">
      <v-row>
        <!-- icon and caption -->
        <v-col cols="12" md="8" class="px-0" no-gutters>
          <v-list-item>
            <v-icon>mdi-filter-variant-plus</v-icon>
            <v-card-title class="subtitle-1"> เลือกช่วงเวลา </v-card-title>
            <!-- Start Date picker -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              max-width="30%"
              class="justify-center"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-row align="center" justify="center">
                  <v-col>
                    <v-text-field
                      :value="computedStartDateFormatted"
                      readonly
                      solo
                      v-bind="attrs"
                      v-on="on"
                      append-icon="mdi-calendar"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
              <v-date-picker
                v-model="startDate"
                locale="th-TH"
                full-width
                @change="startDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- end of start date picker -->
          </v-list-item>
        </v-col>
        <!-- end icon and caption -->
        <!-- end date picker col -->

        <!-- severity col -->
        <v-col cols="12" md="4" no-gutters>
          <v-list-item>
            <v-card-title class="subtitle-1"> ความรุนแรง </v-card-title>
            <!-- select severity -->
            <v-select
              :items="violentType"
              label="ทั้งหมด"
              dense
              solo
              hide-details
            ></v-select>
            <!-- end select severity -->
          </v-list-item>
        </v-col>
        <!-- end severity col -->
      </v-row>
    </v-card>

    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="7" no-gutters>
          <v-col no-gutters>
            <v-card>
              <v-list-item>
                <v-icon size="40">mdi-chart-bar-stacked</v-icon>
                <v-list-item-group>
                  <v-card-title>สรุปผลภารกิจ</v-card-title>
                  <v-card-subtitle
                    >1 December 2020 - 31 December 2020
                  </v-card-subtitle>
                </v-list-item-group>
              </v-list-item>
              <v-list-item>
                <!-- chart -->
                <div class="small">
                  <line-chart
                    :chart-data="datacollection"
                    :options="options"
                  ></line-chart>
                </div>
                <!-- end chart -->
                <v-list-item-group>
                  <v-col>
                    <v-card-title class="headline">
                      ภารกิจทั้งหมด
                    </v-card-title>
                    <v-card-subtitle class="headline">
                      132 ครั้ง
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-title class="headline">
                      ภารกิจเฉลี่ยต่อวัน
                    </v-card-title>
                    <v-card-subtitle class="headline">
                      4.25 ครั้ง
                    </v-card-subtitle>
                  </v-col>
                </v-list-item-group>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col no-gutters id="infoCard">
            <v-card>
              <v-list-item>
                <v-icon size="40">mdi-map-marker-radius</v-icon>
                <v-card-title>สถานที่เกิดเหตุ</v-card-title>
              </v-list-item>
              <v-list-item-content style="align-items: center; padding: 2%">
                <GmapMap
                  ref="mapRef"
                  :center="{ lat: 10, lng: 10 }"
                  :zoom="7"
                  map-type-id="terrain"
                  style="width: 90%; height: 600px"
                />
              </v-list-item-content>
            </v-card>
          </v-col>
        </v-col>
        <v-col cols="12" md="5" style="backgroundcolor: red">
          <v-col>
            <v-card>
              <!-- start card -->
              <v-container style="padding: 3%">
                <v-card>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4" align-self="center">
                        <v-card style="height: 100%" fluid>
                          <!-- IMAGE -->
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            style="min-height: 100%; height: 100%"
                          />
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-list-item-content>
                          <v-list-item>
                            <div
                              class="pa-3 red rounded-circle d-inline-block"
                            ></div>
                            <v-card-title class="pt-0 pb-0 red--text"
                              >รุนแรงมาก</v-card-title
                            >
                          </v-list-item>
                          <v-card-title class="pt-0 black--text">{{
                            locationName
                          }}</v-card-title>
                          <v-card-subtitle>{{ situationTime }}</v-card-subtitle>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-container>
              <!-- end card -->
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import moment from 'moment'
import { format, parseISO } from 'date-fns'
import LineChart from '../plugins/chart'

moment.locale('th')
export default {
  components: {
    LineChart,
  },
  data: () => ({
    startDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    startDateMenu: false,
    endDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    endDateMenu: false,
    violentType: ['ทั้งหมด', 'มาก', 'น้อย'],
    locationName: 'หมู่บ้านเขาใหญ่',
    situationTime: '30 กันยายน 2020 Time 15:52',
    currentLocation: {},
    locations: [
      {
        locationName: '',
        latitude: 14.5347161,
        longitude: 101.3934069,
      },
    ],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
    datacollection: null,
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.6,
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    heightInforCard: 0,
  }),
  computed: {
    computedStartDateFormatted() {
      console.log('startDate before convert: ' + this.startDate)
      return this.startDate ? moment(this.startDate).format('Do MMMM YYYY') : ''
    },
    computedEndDateFormatted() {
      console.log('endDateMenu before convert: ' + this.endDate)
      return this.endDate ? moment(this.endDate).format('Do MMMM YYYY') : ''
    },
  },
  mounted() {
    this.fillData()
    this.getHeightElement()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'อัตราการแจ้งเตือน',
            backgroundColor: '#475520',
            data: [5, 3, 2, 4, 8, 7, 9],
          },
        ],
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getHeightElement() {
      const elmnt = document.getElementById('infoCard')
      console.log(elmnt.offsetHeight)
    },
  },
}
</script>

<style scoped>
.severity {
  color: red;
}
.title-text {
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
