<template>
  <v-card color="basil">
    <v-container class="justify-center">
      <v-row class="justify-center pa-2" dense>
        <v-col cols="11">
          <h2>
            <v-icon x-large>mdi-text-box-check-outline</v-icon>
            รายละเอียดภารกิจ
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="isLoading" opacity="0.7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        <h2>{{ item }}</h2>
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
                      <router-link
                        to="/mission"
                        class="black--text h6"
                        style="text-decoration: none"
                      >
                        <v-btn class="px-8 mx-10"> กลับ </v-btn>
                      </router-link>
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
                      :center="{
                        lat: lat || 14.4386654,
                        lng: lng || 101.3722428,
                      }"
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
          >
            <v-container>
              <v-row>
                <v-col cols="6" sm="2" style="height: 200px">
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
                      <v-list-item-title class="pt-1">
                        จำนวนช้างที่พบ: {{ report.elephantAmount }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="pt-1">
                        <v-row>
                          <v-col class="d-flex justify-center" cols="6" md="3">
                            <vs-tooltip>
                              <i
                                :style="'color: ' + report.colorAngry + ''"
                                :class="
                                  'bx bx-angry ' +
                                  report.animateAngry +
                                  ' bx-md'
                                "
                              ></i>
                              <template #tooltip> ตกมัน </template>
                            </vs-tooltip>
                          </v-col>
                          <v-col class="d-flex justify-center" cols="6" md="3">
                            <vs-tooltip>
                              <i :class="'bx ' + report.animateOnRoad + ''">
                                <v-icon large :color="report.colorOnRoad">
                                  mdi-road-variant</v-icon
                                >
                              </i>
                              <template #tooltip> ขวางถนน </template>
                            </vs-tooltip>
                          </v-col>
                          <v-col class="d-flex justify-center" cols="6" md="3">
                            <vs-tooltip>
                              <i
                                :class="
                                  'bx bx-restaurant ' +
                                  report.animateEat +
                                  ' bx-md'
                                "
                                :style="'color: ' + report.colorEat + ''"
                              ></i>
                              <template #tooltip> กินอาหาร </template>
                            </vs-tooltip>
                          </v-col>
                          <v-col class="d-flex justify-center" cols="6" md="3">
                            <vs-tooltip>
                              <i
                                :class="
                                  'bx bxs-car-crash ' +
                                  report.animateDestroy +
                                  ' bx-md'
                                "
                                :style="'color: ' + report.colorDestroy + ''"
                              ></i>
                              <template #tooltip> ทำลายของ </template>
                            </vs-tooltip>
                          </v-col>
                        </v-row>
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
      lat: 0,
      lng: 0,
    }
  },
  mounted() {
    this.getMissionById()
    this.getReportOfMission(this.missionId)
  },
  methods: {
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
                e.data().severity === 0
                  ? 'รุนแรงน้อย'
                  : doc.severity === 1
                  ? 'รุนแรงปานกลาง'
                  : 'รุนแรงมาก'
              this.missionInfo.severityColor =
                e.data().severity === 0
                  ? 'yellow'
                  : doc.severity === 1
                  ? 'orange'
                  : 'red'
            })

            this.lat = this.missionInfo.latLng.latitude
            this.lng = this.missionInfo.latLng.longitude
            this.markers.position = {
              lat: this.missionInfo.latLng.latitude,
              lng: this.missionInfo.latLng.longitude,
            }

            this.getAttendants(this.missionInfo.missionId)
          })
      } catch (error) {
        console.log('Error Get Mission: ', error)
      }
    },
    async getReportOfMission(missionId) {
      try {
        await this.$fire.firestore
          .collection('reports')
          .where('missionId', '==', missionId)
          .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              const docData = change.doc.data()

              const elephantCharacterTmpAllFalse = [
                {
                  eat: false,
                },
                {
                  onRoad: false,
                },
                {
                  angry: false,
                },
                {
                  destroy: false,
                },
              ]

              let elephantCharacterTmp

              if (change.doc.data().elephantCharacteristics.length > 0) {
                elephantCharacterTmp = change.doc.data().elephantCharacteristics
              } else {
                elephantCharacterTmp = elephantCharacterTmpAllFalse
              }

              if (change.type === 'added') {
                const indexImgReport = this.reportImages.findIndex(
                  (re) => re.imgSrc === docData.imgSrc
                )

                if (indexImgReport === -1) {
                  this.reportImages.push({ imgSrc: docData.imgSrc })
                }

                this.getUserReport(docData.accountId, (eUser) => {
                  const indexUserReport = this.imageList.findIndex(
                    (img) => img.imgSrc === eUser.photoURL
                  )

                  if (indexUserReport === -1) {
                    this.imageList.push({
                      imgSrc: eUser.photoURL,
                    })
                  }

                  const animateActive = 'bx-tada'
                  const animateNoActive = ''
                  const colorActive = '#f05454'
                  const colorNoActive = 'grey'

                  this.reportsList.push({
                    reportId: docData.reportId,
                    missionId: docData.missionId,
                    locationName: docData.locationName,
                    elephantAmount: docData.elephantAmount,
                    imgSrc: docData.imgSrc,
                    detail: docData.reportDetails,
                    timeStamp: this.convertDateTime(docData.timeStamp.seconds),
                    photoURL: eUser.photoURL,
                    displayName: eUser.displayName,
                    colorEat: elephantCharacterTmp[0].eat
                      ? colorActive
                      : colorNoActive,
                    colorOnRoad: elephantCharacterTmp[1].onRoad
                      ? colorActive
                      : colorNoActive,
                    colorAngry: elephantCharacterTmp[2].angry
                      ? colorActive
                      : colorNoActive,
                    colorDestroy: elephantCharacterTmp[3].destroy
                      ? colorActive
                      : colorNoActive,
                    animateEat: elephantCharacterTmp[0].eat
                      ? animateActive
                      : animateNoActive,
                    animateOnRoad: elephantCharacterTmp[1].onRoad
                      ? animateActive
                      : animateNoActive,
                    animateAngry: elephantCharacterTmp[2].angry
                      ? animateActive
                      : animateNoActive,
                    animateDestroy: elephantCharacterTmp[3].destroy
                      ? animateActive
                      : animateNoActive,
                  })
                })
              }

              if (change.type === 'modified') {
              }

              if (change.type === 'removed') {
              }
            })
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
                this.getAttendantsInfo(docData.uid, (user) => {
                  this.attendantImages.push({ imageSrc: user.photoURL })
                })
                this.isLoading = false
              }

              if (change.type === 'modified') {
              }

              if (change.type === 'removed') {
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

      const reportId = this.reportsList[index].reportId
      this.isRemoveLoading = true
      await this.$fire.firestore
        .collection('reports')
        .where('reportId', '==', reportId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = doc.data()

            this.moveToTrash(docData, () => {
              doc.ref.delete()

              // Splice report list
              const indexRemove = this.reportsList.findIndex(
                (re) => re.reportId === docData.reportId
              )
              this.reportsList.splice(indexRemove, 1)

              // Splice images report list from slide
              const indexImageSlide = this.reportImages.findIndex(
                (re) => re.imgSrc === docData.imgSrc
              )

              this.reportImages.splice(indexImageSlide, 1)

              this.isRemoveLoading = false
            })
          })
        })
    },
    async moveToTrash(docData, callback) {
      await this.$fire.firestore
        .collection('trashs')
        .doc()
        .set(docData)
        .then(() => {
          callback()
        })
        .catch((error) => {
          console.log('Error cannot move: ', error)
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
