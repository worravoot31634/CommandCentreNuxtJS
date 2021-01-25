<template>
  <v-container>
    <v-container class="full-height my-16" fluid v-if="isMissionNull">
      <v-row justify="center" align="center">
        <v-col cols="12" md="12" class="d-flex justify-center align-center">
          <img src="../assets/images/box.svg" width="20%" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title
            class="justify-center white--text py-10"
            style="font-size: 100px"
            >There is no a mission</v-card-title
          >
        </v-col>
      </v-row>
    </v-container>
    <v-card class="my-3 mx-3" style="padding: 1%" v-if="!isMissionNull">
      <v-container class="justify-center">
        <v-row class="justify-center pa-2" dense>
          <v-col cols="11">
            <h2>
              <v-icon x-large>mdi-arrow-decision-outline</v-icon>
              ภารกิจปัจจุบัน
            </h2>
          </v-col>
        </v-row>
      </v-container>
      <v-container :key="i" v-for="(item, i) in items">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 8 : 4"
              class="mx-auto transition-swing rounded-xl"
              style="cursor: pointer; margin: 1%"
              :color="item.color"
              @click="getIndex(i)"
            >
              <v-row>
                <v-col class="fill-height py-0" cols="12" md="3">
                  <v-img
                    width="100%"
                    height="180"
                    :src="item.img"
                    class="rounded-xl"
                /></v-col>
                <v-col cols="12" md="7">
                  <v-list-item-content>
                    <v-list-item>
                      <div class="pa-3 red rounded-circle d-inline-block"></div>
                      <v-card-title class="pt-0 pb-0 red--text">
                        รุนแรงมาก
                      </v-card-title>
                    </v-list-item>
                    <v-card-title class="pt-0 black--text">
                      {{ item.locationName }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ item.reportTime }}
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
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [],
    isMissionNull: false,
  }),
  mounted() {
    this.getMission()
  },
  methods: {
    getIndex(index) {
      this.$router.push({
        path: 'missionReportDetails',
        query: {
          mission: this.items[index].missionId,
        },
      })
    },
    async getMission() {
      try {
        // const missionList = []
        let editMission = []

        await this.$fire.firestore
          .collection('mission')
          .where('missionStatus', '==', 0)
          .orderBy('startTimeStamp', 'desc')
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              const doc = change.doc.data()

              if (change.doc.exists === true) this.isMissionNull = false
              else this.isMissionNull = true

              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())
                const reportTime = doc.startTimeStamp.toDate().getTime()
                this.items.push({
                  missionId: doc.missionId,
                  img: doc.imgSrc,
                  level: doc.severity !== 0 ? 'รุนแรงมาก' : 'รุนแรงน้อย',
                  locationName: doc.locationName,
                  reportTime: this.convertDateTime(reportTime),
                  locations: {
                    lat: doc.latLng.latitude,
                    lng: doc.latLng.longitude,
                  },
                })
              }
              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
                const reportTime = doc.startTimeStamp.toDate().getTime()

                editMission = {
                  missionId: doc.missionId,
                  img: doc.imgSrc,
                  level: doc.severity !== 0 ? 'รุนแรงมาก' : 'รุนแรงน้อย',
                  locationName: doc.locationName,
                  reportTime: this.convertDateTime(reportTime),
                  locations: {
                    lat: doc.latLng.latitude,
                    lng: doc.latLng.longitude,
                  },
                }
                const indexChange = this.items.findIndex(
                  (id) => id.missionId === editMission.missionId
                )
                this.$set(this.items, indexChange, editMission)
              }
              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())

                const indexRemove = this.items.findIndex(
                  (id) => id.missionId === doc.missionId
                )

                this.items.splice(indexRemove, 1)
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
  },
}
</script>
