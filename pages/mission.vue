<template>
  <v-container>
    <v-card class="my-10" style="padding: 2%">
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
    itemss: [
      {
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
        level: 'รุนแรงมาก',
        img:
          'https://img.theculturetrip.com/wp-content/uploads/2018/03/3429990505_a91577428a_b.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.42 น.',
      },
      {
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่3',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.32 น.',
      },
      {
        level: 'รุนแรงมาก',
        img:
          'https://sites.google.com/site/babychangthai/_/rsrc/1472766466700/wikvt-payha-chang-thiy/13.jpg',
        locationName: 'เขาใหญ่',
        reportTime: '30 พฤษจิกายน 2563 เวลา 15.52 น.',
      },
      {
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
    items: [],
  }),
  mounted() {
    this.getMission()
  },
  methods: {
    getIndex(index) {
      console.log('iondex is ' + index)
      this.$router.push({
        name: 'missionReportDetails',
        params: {
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
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              //  console.log(change.doc.data())
              const doc = change.doc.data()

              console.log(doc)
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
                console.log('index ', indexChange)
                console.log('edit data ', editMission)
                this.$set(this.items, indexChange, editMission)
                console.log('items ', this.items)
              }
              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())
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
