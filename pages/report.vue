<template>
  <v-container class="pa-6">
    <v-card>
      <v-container class="pa-6">
        <v-container class="justify-center">
          <v-row class="justify-center pa-2" dense>
            <v-col cols="11">
              <h2><v-icon>mdi-bell</v-icon> การแจ้งเตือน</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <!-- List -->
      <v-row class="justify-center" dense>
        <v-col cols="11">
          <v-container
            v-for="(item, i) in reportList"
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
                  @click="getIndex(i)"
                >
                  <v-row no-gutters style="flex-wrap: nowrap">
                    <v-col
                      cols="2"
                      style="min-width: 100px; min-height: 150; max-width: 100%"
                      class="flex-grow-0 flex-shrink-0"
                    >
                      <v-card style="height: 100%" fluid>
                        <!-- IMAGE -->
                        <v-img
                          :src="item.imgSrc"
                          style="min-height: 100%; max-height: 60px"
                        />
                      </v-card>
                    </v-col>
                    <v-col
                      cols="6"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100px;
                        max-height: 100%;
                      "
                      class="flex-grow-1 flex-shrink-0"
                    >
                      <div fluid>
                        <v-card-text
                          class="text-h6"
                          v-text="item.locationName"
                        ></v-card-text>

                        <!-- report time -->
                        <v-card-text v-text="item.timeStamp"></v-card-text>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100%;
                        height: 100%;
                      "
                      class="flex-grow-0 flex-shrink-1"
                    >
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
import moment from 'moment'

export default {
  data: () => ({
    reportList: [],
  }),
  mounted() {
    this.initReport()
  },
  methods: {
    async initReport() {
      try {
        await this.$fire.firestore
          .collection('reports')
          .orderBy('timeStamp', 'desc')
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())
                this.reportList.push({
                  reportId: change.doc.data().reportId,
                  imgSrc: change.doc.data().imgSrc,
                  locationName: change.doc.data().locationName,
                  timeStamp: moment(
                    change.doc.data().timeStamp.nanoseconds
                  ).format('Do MMMM YYYY hh:mm a'),
                })
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
                const editedReport = change.doc.data()
                const indexOldReport = this.reportList.findIndex(
                  (report) => report.reportId === editedReport.reportId
                )
                this.$set(this.reportList, indexOldReport, editedReport)
              }
              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())
                const editedReport = change.doc.data()
                const indexOldReport = this.reportList.findIndex(
                  (report) => report.reportId === editedReport.reportId
                )

                if (indexOldReport >= 0) {
                  this.reportList.splice(indexOldReport, 1)
                }
              }
            })
          })
      } catch (e) {}
    },
    getIndex(index) {
      console.log('index is ' + index)
    },
  },
}
</script>
