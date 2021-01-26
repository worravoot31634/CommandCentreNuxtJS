<template>
  <v-container class="pa-6">
    <v-card>
      <v-container class="pa-6">
        <v-container class="justify-center">
          <v-row class="justify-center pa-2" dense>
            <v-col cols="11">
              <h2><v-icon x-large>mdi-bell</v-icon> การแจ้งเหตุ</h2>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <!-- List -->
      <v-container>
        <v-container v-for="(item, i) in reportList" :key="i">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 8 : 4"
                class="mx-auto transition-swing rounded-xl"
                style="cursor: pointer; margin: 1%"
                :color="item.color"
                @click="showDetail(item.groupId)"
              >
                <v-row>
                  <v-col class="fill-height py-0" cols="12" md="3">
                    <v-img
                      width="100%"
                      height="180"
                      :src="item.imgSrc"
                      class="rounded-xl"
                    >
                    </v-img
                  ></v-col>
                  <v-col cols="12" md="7">
                    <v-list-item-content>
                      <v-card-title class="pt-0 black--text">
                        {{ item.locationName }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ item.timeStamp }}
                      </v-card-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="12" md="2" class="d-flex justify-center">
                    <v-icon size="35"> mdi-text-box-search-outline </v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-container>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    reportList: [],
  }),
  mounted() {
    this.initReport()
  },
  methods: {
    openNotification(position = null, color) {
      const noti = this.$vs.notification({
        color,
        position,
        title: 'มีรายงานใหม่จากผู้ใช้',
        text: 'กรุณาตรวจสอบที่การแจ้งเตือน',
      })
      console.log(noti)
    },
    async initReport() {
      try {
        await this.$fire.firestore
          .collection('reports')
          .where('reportStatus', '==', 0)
          .orderBy('timeStamp', 'asc')
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                const exists = this.reportList.some(
                  (report) =>
                    report.groupId === change.doc.data().locationGroupId
                )

                if (!exists) {
                  this.reportList.unshift({
                    reportId: change.doc.data().reportId,
                    imgSrc: change.doc.data().imgSrc,
                    locationName: change.doc.data().locationName,
                    timeStamp: this.convertDateTime(
                      change.doc.data().timeStamp.toDate()
                    ),
                    groupId: change.doc.data().locationGroupId,
                  })
                } else {
                  console.log('not Exist')
                }
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
    showDetail(gId) {
      console.log('gId is ' + gId)
      this.$router.push({ path: 'report/details/' + gId })
    },
  },
}
</script>
