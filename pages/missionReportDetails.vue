<template>
  <v-card color="basil">
    <v-overlay :value="isLoading" opacity="0.7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        <h1 class="mdc-typography-styles-headline1">{{ item }}</h1>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card color="basil" flat>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card ref="reportInfo" height="100%">
                  <v-card-title class="title-text">
                    {{ imgElephant }}
                  </v-card-title>
                  <v-carousel hide-delimiters height="300" style="padding: 2%">
                    <v-carousel-item
                      v-for="(item, i) in reportImages"
                      :key="i"
                      :src="item.imgSrc"
                    >
                    </v-carousel-item>
                  </v-carousel>
                  <v-list-item-content class="pt-2 pb-0 pr-0 pl-0">
                    <v-list-item>
                      <v-col cols="3" md="1" class="pt-1 pb-0 pr-0 pl-0 pr-0">
                        <div
                          :class="
                            'pa-3 ' +
                            missionInfo.severityColor +
                            ' rounded-circle d-inline-block'
                          "
                        ></div>
                      </v-col>
                      <v-card-title
                        :class="
                          'title-text px-0 py-0 ' +
                          missionInfo.severityColor +
                          '--text'
                        "
                      >
                        {{ missionInfo.severity }}
                      </v-card-title>
                    </v-list-item>
                  </v-list-item-content>
                  <v-card-title class="title-text pt-1">
                    {{ missionInfo.locationName }}
                  </v-card-title>
                  <v-card-subtitle class="subtitle-text">
                    {{ missionInfo.startTimeStamp }}
                  </v-card-subtitle>
                  <v-card-title class="title-text pt-1 pb-1">
                    {{ watcher }}
                  </v-card-title>
                  <v-col class="watcher-image pt-1 pb-1">
                    <vs-avatar-group style="justify-content: left">
                      <vs-avatar
                        max="50"
                        v-for="(image, index) in imageList"
                        :key="index"
                      >
                        <img
                          :src="image.imgSrc"
                          alt=""
                          style="width: 35px; height: 35px"
                        />
                      </vs-avatar>
                    </vs-avatar-group>
                  </v-col>
                  <v-card-title class="title-text pt-1 pb-1">
                    {{ missionParticipants }}
                  </v-card-title>
                  <v-col class="watcher-image">
                    <vs-avatar-group style="justify-content: left">
                      <vs-avatar
                        max="50"
                        v-for="(image, index) in attendantImages"
                        :key="index"
                      >
                        <img
                          :src="image.imageSrc"
                          alt=""
                          style="width: 35px; height: 35px"
                        />
                      </vs-avatar>
                    </vs-avatar-group>
                  </v-col>
                  <v-row class="mt-1" style="padding: 3%">
                    <v-col cols="12" md="16" align="center">
                      <v-btn class="px-8 mx-10">
                        <router-link
                          to="/mission"
                          class="black--text h6"
                          style="text-decoration: none"
                          >กลับ
                        </router-link>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card height="100%">
                  <v-card-title class="title-text">
                    {{ sceneOfaccident }}
                  </v-card-title>
                  <v-list-item-content style="padding: 2%" height="100%">
                    <GmapMap
                      ref="mapRef"
                      :center="{ lat: 14.4386654, lng: 101.3722428 }"
                      :zoom="9"
                      map-type-id="terrain"
                      style="width: 500px; height: 650px"
                      :options="{
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: true,
                        disableDefaultUi: false,
                      }"
                    >
                      <GmapMarker
                        :ref="`marker`"
                        :position="markers.position"
                        type="module"
                        :icon="{
                          url: require('../assets/images/marker.svg'),
                          scaledSize: { width: 80, height: 80 },
                        }"
                      ></GmapMarker>
                    </GmapMap>
                  </v-list-item-content>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-overlay :value="isRemoveLoading" opacity="0.7">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card color="basil" flat>
          <v-card-title class="title-text">{{ sceneOfaccident }}</v-card-title>
          <v-card
            class="mb-5"
            :key="indexReport"
            v-for="(report, indexReport) in reportsList"
            height="15%"
          >
            <v-container>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-img height="100%" :src="report.imgSrc"></v-img>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-list-item>
                    <v-avatar>
                      <img :src="report.photoURL" />
                    </v-avatar>
                    <v-list-item-content class="px-2">
                      <v-list-item-title class="h3 pt-1">
                        {{ report.displayName }}
                      </v-list-item-title>
                      <v-list-item-title class="title-text pt-1">
                        {{ report.locationName }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="subtitle-text pt-1">
                        {{ report.timeStamp }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-list-item-group>
                    <v-list-item-title>
                      <v-row class="h3 pt-1 title-text">
                        <v-col cols="8" md="4">{{ notice }}</v-col>
                        <v-col cols="4" md="8" class="text-right">
                          <v-dialog
                            v-model="dialog['dialog_' + indexReport]"
                            value="false"
                            persistent
                            max-width="400"
                            :retain-focus="false"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                style="margin: 1%"
                                color="red"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon color="white"> mdi-delete</v-icon>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title
                                style="font-size: 16px; font-weight: bold"
                                class="justify-center title-text"
                              >
                                {{ msg_dialog_trash }}
                              </v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="green darken-1"
                                  text
                                  class="title-text"
                                  @click="
                                    dialog['dialog_' + indexReport] = false
                                  "
                                >
                                  {{ cancel }}
                                </v-btn>
                                <v-btn
                                  color="green darken-1"
                                  text
                                  class="title-text"
                                  @click="deleteReportMission(indexReport)"
                                >
                                  {{ accept }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                    <v-list-item-content>
                      <v-card
                        elevation="2"
                        outlined
                        color="#e8e8e8"
                        class="overflow-y-auto"
                        style="padding: 3%"
                        height="100"
                        width="200"
                      >
                        {{ report.detail }}
                      </v-card>
                    </v-list-item-content>
                  </v-list-item-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: [],
      isLoadingA: true,
      tab: null,
      accept: 'ตกลง',
      cancel: 'ยกเลิก',
      items: ['รายละเอียดการแจ้งเตือน', 'รายงานการแจ้งเตือน'],
      imgElephant: 'ภาพเหตุการณ์',
      sceneOfaccident: 'จุดเกิดเหตุ',
      msg_dialog_trash: 'ท่านต้องการย้ายการแจ้งเตือนไปที่ถังขยะหรือไม่',
      reportImages: [],
      severityLevel: 'รุนแรงมาก',
      locationName: 'หมู่บ้านเขาใหญ่',
      situationTime: '30 กันยายน 2020 Time 15:52',
      watcher: 'ผู้พบเห็น',
      missionParticipants: 'ผู้เข้าร่วมภารกิจ',
      attendantImages: [],
      imageList: [],
      notice: 'หมายเหตุ',
      markers: [
        {
          position: { lat: 10, lng: 10 },
        },
      ],
      missionId: '',
      missionInfo: [],
      reportsList: [],
      isshowDialog: true,
      isLoading: true,
      isRemoveLoading: false,
    }
  },
  mounted() {
    console.log('missionId mssId ', this.missionId)
    this.getMissionById()
    this.getReportOfMission(this.missionId)
    console.log('process.browser ', process.browser)
  },
  methods: {
    matchHeight() {
      console.log('params: ', this.missionId)
    },
    async getMissionById() {
      try {
        await this.$fire.firestore
          .collection('mission')
          .where('missionId', '==', this.missionId)
          .get()
          .then((doc) => {
            doc.docs.forEach((e) => {
              this.missionInfo = e.data()
              const timestamp = e.data().startTimeStamp.toDate().getTime()
              this.missionInfo.startTimeStamp = this.convertDateTime(timestamp)
              this.missionInfo.severity =
                e.data().severity === 1 ? 'รุนแรงมาก' : 'รุนแรงน้อย'
              this.missionInfo.severityColor =
                e.data().severity === 1 ? 'red' : 'orange'
            })

            this.markers.position = {
              lat: this.missionInfo.latLng.latitude,
              lng: this.missionInfo.latLng.longitude,
            }
            this.reportImages.push({ imgSrc: this.missionInfo.imgSrc })
            this.getAttendants(this.missionInfo.missionId)
          })
      } catch (error) {
        console.log('Error Get Mission: ', error)
      }
    },
    async getReportOfMission(missionId) {
      try {
        console.log('missionID Report: ', missionId)
        // const newDocData = []

        await this.$fire.firestore
          .collection('reports')
          .where('missionId', '==', missionId)
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              const docData = change.doc.data()

              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())

                const indexImgReport = this.reportImages.findIndex(
                  (img) => img.imgSrc === docData.imgSrc
                )

                if (indexImgReport === -1) {
                  console.log(docData.imgSrc)
                  this.reportImages.push({ imgSrc: docData.imgSrc })
                }
                console.log('Report Images: ', this.reportImages)

                this.getUserReport(docData.accountId, (eUser) => {
                  const indexUserReport = this.imageList.findIndex(
                    (img) => img.imgSrc === eUser.photoURL
                  )

                  if (indexUserReport === -1) {
                    this.imageList.push({
                      imgSrc: eUser.photoURL,
                    })
                  }

                  this.reportsList.push({
                    reportId: docData.reportId,
                    missionId: docData.missionId,
                    locationName: docData.locationName,
                    imgSrc: docData.imgSrc,
                    detail: docData.reportDetails,
                    timeStamp: this.convertDateTime(docData.timeStamp.seconds),
                    photoURL: eUser.photoURL,
                    displayName: eUser.displayName,
                  })
                })
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
                // const indexChange = this.reportsList.findIndex(
                //   (re) => re.imgSrc === change.doc.data().imgSrc
                // )

                // console.log('IndexChange: ', indexChange)
                // newDocData.push({
                //     locationName: docData.locationName,
                //     imgSrc: docData.imgSrc,
                //     detail: docData.reportDetails,
                //     timeStamp: this.convertDateTime(docData.timeStamp.seconds),
                //     photoURL: eUser.photoURL,
                //     displayName: eUser.displayName,
                //   })
                // this.$set(this.reportsList, indexChange, newDocData)
              }

              if (change.type === 'removed') {
              }
            })
            // docs.forEach((doc) => {
            //   console.log('Doc data ', doc.data())

            //   const indexImgReport = this.reportImages.findIndex(
            //     (img) => img.imgSrc === doc.data().imgSrc
            //   )

            //   if (indexImgReport === -1) {
            //     this.reportImages.push({ imgSrc: doc.data().imgSrc })
            //   }

            //   this.getUserReport(doc.data().accountId, (eUser) => {
            //     const indexUserReport = this.imageList.findIndex(
            //       (img) => img.imgSrc === eUser.photoURL
            //     )

            //     if (indexUserReport === -1) {
            //       this.imageList.push({
            //         imgSrc: eUser.photoURL,
            //       })
            //     }

            //     this.reportsList.push({
            //       locationName: doc.data().locationName,
            //       imgSrc: doc.data().imgSrc,
            //       detail: doc.data().reportDetails,
            //       timeStamp: this.convertDateTime(doc.data().timeStamp.seconds),
            //       photoURL: eUser.photoURL,
            //       displayName: eUser.displayName,
            //     })
            //   })
            // })
            // console.log('All report list: ', this.reportsList)
            // console.log('Report List: ', this.reportsList[0].locationName)
          })
      } catch (error) {
        console.log('Error get report of mission ', error)
      }
    },
    async getUserReport(uid, callback) {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .get()
          .then((e) => {
            callback(e.data())
          })
      } catch (error) {
        console.log('Error get user report: ', error)
      }
    },
    async getAttendants(missionId) {
      try {
        await this.$fire.firestore
          .collection('mission')
          .doc(missionId)
          .collection('attendants')
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              const docData = change.doc.data()

              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())
                this.getAttendantsInfo(docData.uid, (user) => {
                  this.attendantImages.push({ imageSrc: user.photoURL })
                })
                this.isLoading = false
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
              }

              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())
                const dataRemoving = change.doc.data()

                this.getAttendantsInfo(dataRemoving.uid, (user) => {
                  const indexRemove = this.attendantImages.findIndex(
                    (att) => att.imageSrc === user.photoURL
                  )
                  this.isLoading = false
                  this.attendantImages.splice(indexRemove, 1)
                })
              }
            })
          })
      } catch (error) {
        console.log('Error Get Attendats Info: ', error)
      }
    },
    async getAttendantsInfo(documentRef, callback) {
      try {
        await documentRef.get().then((e) => {
          callback(e.data())
        })
      } catch (error) {}
    },
    async deleteReportMission(index) {
      // Dismiss Dialog by dialog id
      this.dialog['dialog_' + index] = false

      console.log('reportId Report Delete: ', this.reportsList[index])
      const reportId = this.reportsList[index].reportId
      this.isRemoveLoading = true
      await this.$fire.firestore
        .collection('reports')
        .where('reportId', '==', reportId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = doc.data()
            console.log('Reports Data: ', docData)

            this.moveToTrash(docData, () => {
              doc.ref.delete()

              // Splice report list
              const indexRemove = this.reportsList.findIndex(
                (re) => re.reportId === docData.reportId
              )
              this.reportsList.splice(indexRemove, 1)

              this.isRemoveLoading = false
              console.log('doc.ref.delete')
            })
          })
        })
    },
    async moveToTrash(docData, callback) {
      console.log('Move To Trash: ', docData)
      await this.$fire.firestore
        .collection('trashs')
        .doc()
        .set(docData)
        .then(() => {
          callback()
        })
        .catch((error) => {
          console.log('Cannot move: ', error)
        })
    },
    convertDateTime(microsecond) {
      try {
        const date = new Date(microsecond)
        const dateLocal = date.toLocaleDateString('th-TH', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return dateLocal
      } catch (error) {
        console.log('Error convert date time: ', error)
      }
    },
  },
  created() {
    this.missionId = this.$route.query.mission
    console.log('missionID Query ', this.missionId)
  },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #ffffff !important;
  margin: 3%;
}
.basil--text {
  color: #356859 !important;
}
.row {
  color: #356859;
}
.title-text {
  font-weight: bold;
  font-size: 1.2rem;
  font-family: 'Prompt';
}
.subtitle-text {
  color: rgb(196, 196, 196);
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Prompt';
}
.mdc-typography-styles-headline1 {
  font-family: 'Prompt';
  font-size: 50;
}
.action-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
