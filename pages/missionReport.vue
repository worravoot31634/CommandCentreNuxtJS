<template>
  <v-container fluid>
    <v-card style="margin: 2%">
      <v-row>
        <!-- icon and caption -->
        <v-col cols="12" md="4" class="px-0" no-gutters>
          <v-list-item>
            <v-icon>mdi-filter-variant-plus</v-icon>
            <v-card-title class="subtitle-2"> เลือกช่วงเวลา </v-card-title>
            <!-- Start Date picker -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              max-width="290"
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
            <v-card-title class="subtitle-2 pr-8"> ถึง </v-card-title>
            <!-- End Date picker -->
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              max-width="290"
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
        <v-col cols="12" md="4" no-gutters>
          <v-list-item>
            <v-card-title class="subtitle-2"> ความรุนแรง </v-card-title>
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

    <v-container>
      <v-row>
        <v-col cols="">
          <v-col><v-card color="green">AAAAAAAAAAA</v-card></v-col>
          <v-col><v-card color="green">BBBBBBBBB</v-card></v-col>
        </v-col>
        <v-spacer />
        <v-col><v-card color="green">CCCCCCCCCC</v-card></v-col>
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
    violentType: ['ทั้งหมด', 'มาก', 'น้อย'],
    currentLocation: {},
    locations: [
      {
        locationName: '',
        latitude: 14.5347161,
        longitude: 101.3934069,
      },
    ],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
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

<style scoped></style>
