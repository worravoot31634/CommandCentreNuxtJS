<template>
  <v-container>
    <v-container class="justify-center">
      <v-row class="justify-center pa-4" dense>
        <v-col cols="11" black>
          <h2><v-icon>mdi-file-chart</v-icon> รายงานภารกิจ</h2>
        </v-col>
      </v-row>
    </v-container>
    <!-- content -->
    <v-container>
      <v-card class="mx-auto pa-2">
        <div class="text-lg-h6">
          <v-row>
            <v-col>
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12" sm="4">
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-card class="pa-2 text-center" outlined tile>
                          เลือกช่วงเวลา
                        </v-card>
                      </v-col>
                      <v-col cols="8">
                        <v-card class="pa-2" outlined tile>
                          <!-- Start Date picker -->
                          <v-menu
                            v-model="startDateMenu"
                            :close-on-content-click="false"
                            max-width="290"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                :value="computedStartDateFormatted"
                                prepend-icon="mdi-calendar"
                                readonly
                                solo
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="startDate"
                              locale="th-TH"
                              @change="startDateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                          <!-- end of start date picker -->
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-row no-gutters>
                      <v-col cols="4" class="sm-4">
                        <v-card class="pa-2 text-center" outlined tile>
                          ถึง
                        </v-card>
                      </v-col>
                      <v-col cols="8" class="sm-8">
                        <v-card class="pa-2" outlined tile>
                          <!-- End Date picker -->
                          <v-menu
                            v-model="endDateMenu"
                            :close-on-content-click="false"
                            max-width="290"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                :value="computedEndDateFormatted"
                                prepend-icon="mdi-calendar"
                                readonly
                                solo
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="endDate"
                              locale="th-TH"
                              @change="endDateMenu = false"
                            ></v-date-picker>
                          </v-menu>
                          <!-- end of end date picker -->
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-card class="pa-2 text-center" outlined tile>
                          ระดับความรุนแรง
                        </v-card>
                      </v-col>
                      <v-col cols="8">
                        <v-card class="pa-2" outlined tile>
                          <v-col cols="12">
                            <v-row no-gutters>
                              <v-col cols="10">
                                <v-select
                                  :items="violentType"
                                  label="เลือก"
                                  solo
                                />
                              </v-col>
                              <v-col cols="2" class="pa-1">
                                <v-btn color="dark" fab small>
                                  <v-icon>mdi-magnify </v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>

    <v-container>
      <v-row>
        <!-- left -->
        <v-col cols="7">
          <v-row>
            <v-col cols="12">
              <v-card class="mx-auto pa-6" height="300px">
                สรุปผลภารกิจ
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="mx-auto pa-6">
                <v-row>
                  <v-col> สถานที่เกิดเหตุ</v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <GMap
                      ref="gMap"
                      language="th"
                      :center="{
                        lat: locations[0].latitude,
                        lng: locations[0].longitude,
                      }"
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
                              <vs-row
                                ><i class="bx bxs-donate-heart"></i
                              ></vs-row>
                              <vs-row align="center" justify="center">
                                Location Name:
                                {{ locations[index].locationName }}
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
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- right -->
        <v-col cols="5">
          <v-card class="mx-auto pa-6"> รายงานภารกิจ </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import moment from 'moment'
import { format, parseISO } from 'date-fns'
moment.locale('th')
export default {
  data: () => ({
    startDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    startDateMenu: false,
    endDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    endDateMenu: false,
    violentType: ['ทั้งหมด', 'มาก', 'ปานกลาง', 'น้อย'],
    currentLocation: {},
    locations: [
      {
        locationName: '',
        latitude: 14.5347161,
        longitude: 101.3934069,
      },
    ],
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
}
</script>
