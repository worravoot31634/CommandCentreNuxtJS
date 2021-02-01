<template>
  <v-container fluid>
    <v-overlay :value="isQueryLoading" opacity="0.7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card class="align-center justify-center ml-4 mt-6 mr-4 mb-4">
      <v-row>
        <!-- icon and caption -->
        <v-col cols="12" md="4" class="px-0" no-gutters>
          <v-list-item>
            <v-card-title class="subtitle-2 pl-2 py-0 pr-2">
              เลือกช่วงเวลา
            </v-card-title>
            <!-- Start Date picker -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              min-width="15%"
              class="justify-center pl-2"
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
        <v-col cols="12" md="7">
          <v-col class="px-1">
            <v-card>
              <v-row>
                <v-col cols="12" md="6">
                  <v-list-item>
                    <v-icon size="40">mdi-chart-bar-stacked</v-icon>
                    <v-list-item-group>
                      <v-card-title>สรุปผลภารกิจ</v-card-title>
                      <v-card-subtitle>
                        {{
                          new Date(startDate).toLocaleDateString() +
                          ' - ' +
                          new Date(endDate).toLocaleDateString()
                        }}
                      </v-card-subtitle>
                    </v-list-item-group>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="6" class="align-end justify-end">
                  <v-radio-group v-model="chartOption" row v-on="changeChart()">
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
                      {{ totalMission }} ครั้ง
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-title class="headline">
                      ภารกิจเฉลี่ยต่อวัน
                    </v-card-title>
                    <v-card-subtitle class="headline">
                      {{ averageMission }} ครั้ง
                    </v-card-subtitle>
                  </v-col>
                </v-list-item>
              </v-list-item-group>
            </v-card>
          </v-col>
          <v-col class="px-1" id="infoCard">
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
        <v-col cols="12" md="5">
          <v-col class="py-0 pr-1 pl-2">
            <v-card>
              <!-- start card -->
              <v-container style="padding: 3%">
                <v-row justify="center" align="center">
                  <v-col cols="12" md="6">
                    <v-card-title
                      v-if="!isNotNull"
                      class="justify-center black--text"
                      >ไม่พบข้อมูล</v-card-title
                    >
                  </v-col>
                </v-row>
                <v-container
                  class="my-2"
                  :key="index"
                  v-for="(mission, index) in pagesList"
                >
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 8 : 4"
                        @click="getIndex(index)"
                        class="mx-auto transition-swing"
                        style="cursor: pointer"
                      >
                        <v-row>
                          <v-col cols="12" md="4" align-self="center">
                            <v-col style="height: 100%" fluid class="py-2 px-2">
                              <!-- IMAGE -->
                              <v-img
                                class="rounded"
                                :src="mission.imgSrc"
                                style="min-height: 100px; height: 100px"
                              />
                            </v-col>
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
                              <v-card-subtitle class="col-12 text-truncate">
                                {{ mission.details }}
                              </v-card-subtitle>
                            </v-list-item-content>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-hover>
                </v-container>
                <v-row>
                  <v-col>
                    <div class="text-center py-1">
                      <v-pagination
                        v-if="isPaginationShow"
                        v-model="page"
                        v-on:next="nextData"
                        v-on:previous="previousData"
                        v-on:input="inputData"
                        :length="totalPage"
                        :total-visible="tVisiblePagination"
                      ></v-pagination>
                    </div>
                  </v-col>
                </v-row>
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
    violentType: ['ทั้งหมด', 'มากไปน้อย', 'น้อยไปมาก'],
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
    chartMonthList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    chartWeekList: [0, 0, 0, 0, 0, 0, 0],
    chartYearList: [],
    chartLabelList: [],
    chartValueList: [],
    thiaMonth: [
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
    week: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    page: 1,
    isPaginationShow: false,
    totalPage: 0,
    perPage: 7,
    tVisiblePagination: 5,
    pagesList: [],
    isQueryLoading: true,
    totalMission: 0,
    averageMission: 0,
    latlon: null,
  }),
  computed: {
    google: gmapApi,
    computedStartDateFormatted() {
      return this.startDate ? moment(this.startDate).format('Do MMMM YYYY') : ''
    },
    computedEndDateFormatted() {
      return this.endDate ? moment(this.endDate).format('Do MMMM YYYY') : ''
    },
  },
  mounted() {
    this.filter()
  },
  methods: {
    pointHeatMap() {
      try {
        if (this.latlon !== null) {
          this.latlon.clear()
        }

        this.latlon = new this.google.maps.MVCArray()
        this.$refs.mapRef.$mapPromise.then(() => {
          this.points.forEach((value) => {
            this.latlon.push(new this.google.maps.LatLng(value.lat, value.lng))
          })

          const heatMap = new this.google.maps.visualization.HeatmapLayer({
            data: this.latlon,
            map: this.$refs.mapRef.$mapObject,
          })

          console.log(heatMap)
        })
      } catch (error) {
        console.log('Heat Map Error: ', error)
      }
    },
    filter() {
      const startMicro = new Date(this.startDate)
      const endMicro = new Date(this.endDate)
      endMicro.setHours(23, 59)
      this.query(startMicro, endMicro)
    },
    async query(startdate, enddate) {
      try {
        /// Clear value in List for every query
        this.queryList = []
        this.points = []
        this.chartMonthList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.chartWeekList = [0, 0, 0, 0, 0, 0, 0]
        this.chartYearList = []
        this.chartValueList = []
        this.pagesList = []
        this.isQueryLoading = true
        this.isNotNull = false

        /// Dynamic List follow by [chartLabelList] length
        if (this.chartOption === 2) {
          for (const x in this.chartLabelList) {
            this.chartYearList.push(0)
          }
        }

        await this.$fire.firestore
          .collection('mission')
          .where('startTimeStamp', '>=', startdate)
          .where('startTimeStamp', '<=', enddate)
          .orderBy('startTimeStamp')
          .get()
          .then((query) => {
            query.docs.forEach((e) => {
              // Microseconds for firestore [startTimeStamp]
              const secondStartTSP = e.data().startTimeStamp.toDate()

              // Query chart by a week option
              if (this.chartOption === 0) {
                this.chartWeek(secondStartTSP, () => {
                  this.chartValueList = this.chartWeekList
                })
              }

              // Query chart by a month option
              if (this.chartOption === 1) {
                this.chartMonth(secondStartTSP, () => {
                  this.chartValueList = this.chartMonthList
                })
              }

              // Query chart by a year option
              if (this.chartOption === 2) {
                this.chartYear(secondStartTSP, () => {
                  this.chartValueList = this.chartYearList
                })
              }

              // Set HeatMap Position
              this.points.push({
                lat: e.data().latLng.latitude,
                lng: e.data().latLng.longitude,
              })

              const lastElement = this.queryList[this.queryList.length - 1]

              // Query by severity and Default value is ASC
              if (this.violent === 'มากไปน้อย') {
                this.DESC(lastElement, e.data())
              } else {
                this.ASC(lastElement, e.data())
              }
            })

            if (this.queryList.length > 7) {
              this.initPage()
              this.isPaginationShow = true
              this.isQueryLoading = false
            } else {
              this.pagesList = this.queryList
              this.isPaginationShow = false
              this.isQueryLoading = false
            }

            this.pointHeatMap()
            this.chart()
            this.totalMission = this.queryList.length

            // get sum in [cahrtValueList]
            const querySum = this.chartValueList.reduce((sum, number) => {
              return sum + number
            }, 0)

            // Find Average
            const numDates = this.getDaybetweenDates(startdate, enddate)
            this.averageMission = (querySum / numDates).toFixed(2)

            if (this.queryList.length !== 0) this.isNotNull = true
          })
      } catch (error) {
        console.log('Error Query: ', error)
      }
    },
    chartMonth(timestamp, callback) {
      const startDate = new Date(timestamp)
      this.chartMonthList[startDate.getMonth()] =
        this.chartMonthList[startDate.getMonth()] + 1
      callback()
    },
    chartWeek(timestamp, callback) {
      const startDate = new Date(timestamp)
      this.chartWeekList[startDate.getDay()] =
        this.chartWeekList[startDate.getDay()] + 1
      callback()
    },
    chartYear(timestamp, callback) {
      // Thai year
      const startYear = new Date(timestamp).getFullYear() + 543
      // Convert to string
      const startYearStr = startYear.toString()
      // Get index which search by startYearStr
      const indexYear = this.chartLabelList.indexOf(startYearStr)

      this.chartYearList[indexYear] = this.chartYearList[indexYear] + 1
      callback()
    },
    changeChart() {
      // All of this change chart label

      // Week label
      if (this.chartOption === 0) {
        this.chartLabelList = []
        this.chartLabelList = this.week
      }

      // Month label
      if (this.chartOption === 1) {
        this.chartLabelList = []
        this.chartLabelList = this.thiaMonth
      }

      // Year label
      if (this.chartOption === 2) {
        this.chartLabelList = []
        let startYear = new Date(this.startDate).getFullYear()
        const endYear = new Date(this.endDate).getFullYear()
        const yearLabelList = []
        while (startYear <= endYear) {
          yearLabelList.push((startYear + 543).toString())
          startYear += 1
        }
        this.chartLabelList = yearLabelList
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
    getDaybetweenDates(first, second) {
      const fistDate = new Date(first)
      const secondDate = new Date(second)
      const diffTime = secondDate.getTime() - fistDate.getTime()
      // 86400000 number of day in microsecond
      const numOfDay = Math.ceil(diffTime / 86400000)
      return numOfDay
    },
    setQueryList(query) {
      try {
        // set data to query list
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
          missionId: query.missionId,
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
        // Insert data to query list by index
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
          missionId: query.missionId,
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
    chart() {
      /**
       * Setting Chart
       * Set of value in chart [chartValueList]
       * Label of chart [chartLabelList]
       */
      this.datacollection = {
        labels: this.chartLabelList,
        datasets: [
          {
            label: 'อัตราการแจ้งเตือน',
            backgroundColor: '#475520',
            data: this.chartValueList,
          },
        ],
      }
    },
    previousData() {
      // ฟังก์ชั่นกดปุ่มย้อนกลับ
      this.fetchQuery(this.page)
    },
    inputData(value) {
      this.page = value
      this.fetchQuery(this.page)
    },
    nextData() {
      // ฟังก์ชั่นกดปุ่มถัดไป
      this.fetchQuery(this.page)
    },
    initPage() {
      this.totalPage = Math.ceil(this.queryList.length / this.perPage)
      this.fetchQuery(this.page)
    },
    fetchQuery(value) {
      try {
        let numOfPages = value * this.perPage
        this.pagesList = []

        if (value === 1) {
          /**
           * Initialized pagination pages
           */
          for (let i = 0; i < numOfPages; i++) {
            this.pagesList.push(this.queryList[i])
          }
        } else if (numOfPages > this.queryList.length) {
          /**
           * This a condition handle null because of [queryList] legnth per [perPage]
           * (value - 1) for getting last index of previous the page
           */
          const startCounter = this.perPage * (value - 1)
          numOfPages = this.queryList.length

          for (let i = startCounter; i < numOfPages; i++) {
            this.pagesList.push(this.queryList[i])
          }
        } else {
          /**
           * (value - 1) for getting last index of previous the page
           */
          const startCounter = this.perPage * (value - 1)

          for (let i = startCounter; i < numOfPages; i++) {
            this.pagesList.push(this.queryList[i])
          }
        }
      } catch (error) {
        console.log('ERROR fetch query: ', error)
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getHeightElement() {
      const elmnt = document.getElementById('infoCard')
    },
    getIndex(index) {
      this.$router.push({
        path: 'queryMissionDetail',
        query: {
          mission: this.queryList[index].missionId,
        },
      })
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
