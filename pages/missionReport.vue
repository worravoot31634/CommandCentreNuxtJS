<template>
  <v-container fluid>
    <v-card style="margin: 2%" class="align-center justify-center">
      <v-row>
        <!-- icon and caption -->
        <v-col cols="12" md="4" class="px-0" no-gutters>
          <v-list-item>
            <v-card-title class="subtitle-2 pl-2 py-0 pr-4 pl-2">
              เลือกช่วงเวลา
            </v-card-title>
            <!-- Start Date picker -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              min-width="15%"
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
                      style="width: 100%"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
              <v-date-picker
                v-model="startDate"
                locale="th-TH"
                @change="startDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- end of start date picker -->
          </v-list-item>
        </v-col>
        <!-- end icon and caption -->

        <!-- start date picker col -->
        <v-col cols="12" md="4" class="px-0" no-gutters>
          <v-list-item class="text-right">
            <v-card-title class="subtitle-2 pr-8 px-2 py-0"> ถึง </v-card-title>
            <!-- End Date picker -->
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              min-width="15%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="computedEndDateFormatted"
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
                  append-icon="mdi-calendar"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                locale="th-TH"
                @change="endDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- end of end date picker -->
          </v-list-item>
        </v-col>
        <!-- end date picker col -->

        <!-- severity col -->
        <v-col cols="12" md="3" no-gutters class="px-0">
          <v-list-item class="pl-0">
            <v-card-title class="subtitle-2"> ความรุนแรง </v-card-title>
            <!-- select severity -->
            <v-select
              v-model="violent"
              :items="violentType"
              label="ทั้งหมด"
              style="width: 6%"
              dense
              solo
              hide-details
            ></v-select>
            <!-- end select severity -->
          </v-list-item>
        </v-col>
        <v-col cols="12" md="1" no-gutters class="px-0 pt-4">
          <v-list-item>
            <v-btn color="primary" @click="filter()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
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
              <v-row>
                <v-col cols="12" md="6">
                  <v-list-item>
                    <v-icon size="40">mdi-chart-bar-stacked</v-icon>
                    <v-list-item-group>
                      <v-card-title>สรุปผลภารกิจ</v-card-title>
                      <v-card-subtitle
                        >1 December 2020 - 31 December 2020
                      </v-card-subtitle>
                    </v-list-item-group>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="6" class="align-end justify-end">
                  <v-radio-group v-model="chartOption" row>
                    <v-radio
                      v-for="(n, i) in chartOptions"
                      :key="i"
                      :label="n"
                      :value="i"
                      :name="'chart-' + i"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-list-item-group>
                <!-- chart -->
                <div class="small">
                  <line-chart
                    :chart-data="datacollection"
                    :options="options"
                  ></line-chart>
                </div>
                <!-- end chart -->
                <v-list-item>
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
                </v-list-item>
              </v-list-item-group>
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
                  :center="{ lat: 14.5347161, lng: 101.3934069 }"
                  :zoom="9"
                  map-type-id="terrain"
                  style="width: 90%; height: 600px"
                >
                </GmapMap>
              </v-list-item-content>
            </v-card>
          </v-col>
        </v-col>
        <v-col cols="12" md="5" style="backgroundcolor: red">
          <v-col class="py-0">
            <v-card>
              <!-- start card -->
              <v-container style="padding: 3%">
                <v-card
                  class="my-2"
                  :key="index"
                  :v-if="queryList.length != 0"
                  v-for="(mission, index) in queryList"
                >
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4" align-self="center">
                        <v-card style="height: 100%" fluid>
                          <!-- IMAGE -->
                          <v-img
                            :src="mission.imgSrc"
                            style="min-height: 100px; height: 100px"
                          />
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-list-item-content>
                          <v-list-item>
                            <div
                              :class="
                                'pa-3 ' +
                                mission.levelColor +
                                ' rounded-circle d-inline-block'
                              "
                            ></div>
                            <v-card-title
                              :class="
                                'pt-0 pb-0 ' +
                                mission.levelColor +
                                '--text darken-1'
                              "
                              >{{ mission.level }}</v-card-title
                            >
                          </v-list-item>
                          <v-card-title class="pt-0 black--text">{{
                            mission.locationName
                          }}</v-card-title>
                          <v-card-subtitle>{{
                            mission.details
                          }}</v-card-subtitle>
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
import { gmapApi } from 'vue2-google-maps'
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
    datacollection: [],
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
      orderby: 'desc',
    },
    heightInforCard: 0,
    points: [],
    chartOptions: ['รายสัปดาห์', 'รายเดือน', 'รายปี'],
    radioGroup: 1,
    queryList: [],
    isNotNull: false,
    violent: null,
    chartOption: 1,
    chartValueList: [],
    cahrtLabelList: [],
  }),
  computed: {
    google: gmapApi,
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
  },
  methods: {
    pointHeatMap() {
      try {
        const latlon = new this.google.maps.MVCArray()
        latlon.clear()
        this.$nextTick(() => {
          this.$refs.mapRef.$mapPromise.then(() => {
            this.points.forEach((value) => {
              latlon.push(new this.google.maps.LatLng(value.lat, value.lng))
            })
            console.log('LatLongLIst: ', latlon)
            console.log('Length: ', this.points.length)
            const x = new this.google.maps.visualization.HeatmapLayer({
              data: latlon,
              map: this.$refs.mapRef.$mapObject,
            })

            if (this.points.length === 0) {
              console.log('Jame')
            }
            console.log(x)
          })
        })
      } catch (error) {
        console.log('Heat Map Error: ', error)
      }
    },
    filter() {
      const startMicro = new Date(this.startDate)
      const endMicro = new Date(this.endDate)
      endMicro.setHours(23, 59)
      console.log('StartDate: ', startMicro)
      console.log('End Date: ', endMicro)

      console.log('Timestamp: ')
      this.query(startMicro, endMicro)
    },
    async query(startdate, enddate) {
      try {
        this.queryList = []
        this.points = []

        console.log('Select: ', this.violent)
        console.log('chartOptions: ', this.chartOption)

        await this.$fire.firestore
          .collection('mission')
          .where('startTimeStamp', '>=', startdate)
          .where('startTimeStamp', '<=', enddate)
          .orderBy('startTimeStamp')
          .get()
          .then((query) => {
            query.docs.forEach((e) => {
              console.log(e.data())

              // initialized chart value

              // Set HeatMap Position
              this.points.push({
                lat: e.data().latLng.latitude,
                lng: e.data().latLng.longitude,
              })
              console.log('Locations: ', this.points)

              const lastElement = this.queryList[this.queryList.length - 1]
              console.log(lastElement)

              if (this.violent === 'มาก') {
                this.DESC(lastElement, e.data())
              } else {
                this.ASC(lastElement, e.data())
              }
            })

            console.log('Sort data: ', this.queryList)
            console.log('Points: ', this.points)
            this.pointHeatMap()
            if (this.queryList.length !== 0) this.isNotNull = true
          })
      } catch (error) {
        console.log('Error Query: ', error)
      }
    },
    ASC(lastElement, query) {
      // Initialize sort query list
      if (typeof lastElement !== 'undefined') {
        // Last severity of [queryList] less than severity from Firestore

        if (lastElement.severity < query.severity) {
          // And push data in [queryList]
          this.setQueryList(query)
        } else {
          // Find index of [queryList] more than severity from Firestore
          const index = this.queryList.findIndex(
            (q) => q.severity > query.severity
          )

          // Insert data by index
          this.insertQueryList(index, query)
        }
      } else {
        // First data of [queryList]
        this.setQueryList(query)
      }
    },
    DESC(lastElement, query) {
      if (typeof lastElement !== 'undefined') {
        if (lastElement.severity > query.severity) {
          this.setQueryList(query)
        } else {
          // Find index of [queryList] more than severity from Firestore
          const index = this.queryList.findIndex(
            (q) => q.severity < query.severity
          )

          // Insert data by index
          this.insertQueryList(index, query)
        }
      } else {
        this.setQueryList(query)
      }
    },
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
    setQueryList(query) {
      try {
        let level = ''
        let severityColor = ''
        if (query.severity === 0) {
          level = 'รุนแรงน้อย'
          severityColor = 'yellow'
        } else if (query.severity === 1) {
          level = 'รุนแรงปานกลาง'
          severityColor = 'orange'
        } else {
          level = 'รุนแรงมาก'
          severityColor = 'red'
        }

        this.queryList.push({
          imgSrc: query.imgSrc,
          details: query.details,
          locationName: query.locationName,
          level: level ?? null,
          levelColor: severityColor,
          severity: query.severity,
        })
      } catch (error) {
        console.log('Error set QueryList: ', error)
      }
    },
    insertQueryList(index, query) {
      try {
        let level = ''
        let severityColor = ''

        if (query.severity === 0) {
          level = 'รุนแรงน้อย'
          severityColor = 'yellow'
        }
        if (query.severity === 1) {
          level = 'รุนแรงปานกลาง'
          severityColor = 'orange'
        }
        if (query.severity === 2) {
          level = 'รุนแรงมาก'
          severityColor = 'red'
        }

        const newDataQuery = {
          imgSrc: query.imgSrc,
          details: query.details,
          locationName: query.locationName,
          level: level ?? null,
          levelColor: severityColor,
          severity: query.severity,
        }

        this.queryList.splice(index, 0, newDataQuery)
      } catch (error) {
        console.log('Error set QueryList: ', error)
      }
    },
    fillData() {
      this.datacollection = {
        labels: [
          'ม.ค.',
          'ก.พ.',
          'มี.ค.',
          'เม.ย',
          'พ.ค.',
          'มิ.ย.',
          'ก.ค.',
          'ส.ค.',
          'ก.ย.',
          'ต.ค.',
          'พ.ย.',
          'ธ.ค.',
        ],
        datasets: [
          {
            label: 'อัตราการแจ้งเตือน',
            backgroundColor: '#475520',
            data: [5, 3, 2, 4, 8, 7, 9, 9, 9, 9, 9, 9],
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
