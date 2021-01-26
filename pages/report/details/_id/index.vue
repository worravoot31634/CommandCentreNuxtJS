<template>
  <v-card color="basil">
    <v-container class="justify-center">
      <v-row class="justify-center pa-2" dense>
        <v-col color="black" cols="11" class="text-h5">
          <v-icon color="black" large>mdi-text-box-check-outline</v-icon>
          รายละเอียดการแจ้งเหตุ
        </v-col>
      </v-row>
    </v-container>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab
        v-for="item in items"
        :key="item"
        style="font-weight: bold"
        class="text-subtitle-1"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="pa-3" flat>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card ref="reportInfo" height="100%">
                  <v-card-title class="title-text text-subtitle-1">
                    {{ imgElephant }}
                  </v-card-title>

                  <v-carousel hide-delimiters height="300" style="padding: 2%">
                    <v-carousel-item
                      v-for="(item, i) in reportList"
                      :key="i"
                      :src="item.imgSrc"
                    ></v-carousel-item>
                  </v-carousel>
                  <v-card-title class="title-text text-subtitle-1">{{
                    missionLocationNameShow
                  }}</v-card-title>
                  <v-card-subtitle>
                    {{ situationTime }}
                  </v-card-subtitle>

                  <v-card-title class="title-text text-subtitle-1">
                    {{ watcher }}
                  </v-card-title>
                  <v-card-subtitle>
                    <v-col class="watcher-image pt-1 pb-1">
                      <vs-avatar-group max="10" style="justify-content: left">
                        <vs-avatar v-for="(item, i) in userReportList" :key="i">
                          <img
                            :src="item.photoURL"
                            alt=""
                            style="width: 35px; height: 35px"
                          />
                        </vs-avatar>
                      </vs-avatar-group>
                    </v-col>
                  </v-card-subtitle>
                  <v-row class="mt-10" style="padding: 3%">
                    <v-col cols="12" md="16" align="center">
                      <v-btn class="px-8 mx-10" @click="goToReport()">
                        <v-card-text style="font-weight: bold; font-size: 18"
                          >กลับ
                        </v-card-text>
                      </v-btn>

                      <v-dialog
                        transition="dialog-bottom-transition"
                        width="70%"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="px-2 mx-10"
                            color="#B7D36A"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-card-text
                              style="
                                color: white;
                                font-weight: bold;
                                font-size: 20;
                              "
                              >สร้างภารกิจ
                            </v-card-text>
                          </v-btn>
                        </template>
                        <template
                          v-slot:default="dialogCreateMision"
                          class="pa-2"
                        >
                          <v-card>
                            <v-toolbar color="success" dark
                              >สร้างภารกิจ
                            </v-toolbar>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="8">
                                  <v-row>
                                    <v-col cols="12">เลือกรูปภาพ</v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="12">
                                      <vue-select-image
                                        h="70px"
                                        w="70px"
                                        :dataImages="dataImages"
                                        @onselectimage="onSelectImage"
                                      >
                                      </vue-select-image>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="12">เลือกสถานที่</v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                      <location-picker
                                        v-model="missionPinedLocation"
                                        :options="locationPickerOptions"
                                        style="height: 450px"
                                      >
                                      </location-picker>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-col cols="12" sm="4">
                                  <v-row>
                                    <v-col cols="12">
                                      <v-row>
                                        <v-col cols="12"> ชื่อสถานที่</v-col>
                                      </v-row>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field
                                            v-model="missionLocationName"
                                            label="ชื่อสถานที่"
                                            solo
                                          >
                                          </v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="8">
                                      <v-row>
                                        <v-col cols="12">
                                          ระดับความรุนแรง
                                        </v-col>
                                      </v-row>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-select
                                            v-model="missionViolentLevel"
                                            :items="violentItems"
                                            item-text="violentTxt"
                                            item-value="violentVal"
                                            label="เลือก"
                                            solo
                                          >
                                          </v-select>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                    <v-col cols="4">
                                      <v-row>
                                        <v-col cols="12">
                                          <v-row>
                                            <v-col cols="12">จำนวนช้าง</v-col>
                                          </v-row>
                                          <v-row>
                                            <v-col cols="12">
                                              <v-text-field
                                                v-model="missionNumberElephant"
                                                type="number"
                                                label="1"
                                                value="1"
                                                solo
                                              >
                                              </v-text-field>
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="12">รายละเอียด</v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="missionDetial"
                                        solo
                                        name="input-7-4"
                                        label="อธิบายเพิ่มเติม.."
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="dark"
                                text
                                @click="dialogCreateMision.value = false"
                              >
                                ยกเลิก
                              </v-btn>
                              <v-btn
                                color="primary"
                                text
                                @click="createMission"
                              >
                                สร้าง
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                      <v-dialog
                        v-model="dialogConfirmCreateMission"
                        persistent
                        max-width="290"
                      >
                        <v-card>
                          <v-card-title class="headline">
                            สร้างภารกิจสำเร็จ
                          </v-card-title>
                          <v-card-text
                            >สามารถตรวจสอบภารกิจทั้งหมดได้ในเมนูภารกิจ</v-card-text
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="green darken-1"
                              text
                              @click="createSuccess()"
                            >
                              ตกลง
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="dialogError" max-width="290">
                        <v-card>
                          <v-card-title class="headline">
                            เกิดข้อผิดพลาด
                          </v-card-title>
                          <v-card-text>กรุณากรอกข้อมูลให้ครบ</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="red darken-1"
                              text
                              @click="dialogError = false"
                            >
                              ตกลง
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card height="100%">
                  <v-card-title class="title-text text-subtitle-1">
                    {{ sceneOfaccident }}
                  </v-card-title>
                  <v-list-item-content style="padding: 2%" height="100%">
                    <GmapMap
                      ref="mapRef"
                      :center="{
                        lat: initLatLng[0].latitude,
                        lng: initLatLng[0].longitude,
                      }"
                      :zoom="15"
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
                        v-for="(m, index) in reportList"
                        :key="index"
                        :position="{
                          lat: m.pinLatLng.latitude,
                          lng: m.pinLatLng.longitude,
                        }"
                        :icon="{
                          url: require('~/assets/images/marker.svg'),
                          scaledSize: { width: 50, height: 50 },
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
        <v-card color="basil" flat>
          <v-row>
            <v-col>
              <v-row v-for="(item, i) in reportList" :key="i">
                <v-col>
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="6" sm="2">
                          <v-img
                            height="100%"
                            max-height="200"
                            :src="item.imgSrc"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" sm="5">
                          <v-list-item>
                            <v-avatar>
                              <img :src="item.photoURL" alt="userImg" />
                            </v-avatar>
                            <v-list-item-content class="px-2">
                              <v-list-item-title class="h3 pt-1">
                                ผู้แจ้ง: {{ item.displayName }}
                              </v-list-item-title>
                              <v-list-item-title class="pt-1">
                                {{ item.locationName }}
                              </v-list-item-title>
                              <v-list-item-subtitle class="pt-1">
                                {{ item.timeStamp }}
                              </v-list-item-subtitle>
                              <v-list-item-title class="pt-1">
                                จำนวนช้างที่พบ: 1
                              </v-list-item-title>
                              <v-list-item-subtitle class="pt-1">
                                <v-row>
                                  <v-col
                                    class="d-flex justify-center"
                                    cols="6"
                                    md="3"
                                  >
                                    <vs-tooltip>
                                      <i
                                        :style="
                                          'color: ' + item.colorAngry + ''
                                        "
                                        :class="
                                          'bx bx-angry ' +
                                          item.animateAngry +
                                          ' bx-md'
                                        "
                                      ></i>
                                      <template #tooltip> ตกมัน </template>
                                    </vs-tooltip>
                                  </v-col>
                                  <v-col
                                    class="d-flex justify-center"
                                    cols="6"
                                    md="3"
                                  >
                                    <vs-tooltip>
                                      <i
                                        :class="'bx ' + item.animateOnRoad + ''"
                                      >
                                        <v-icon large :color="item.colorOnRoad">
                                          mdi-road-variant</v-icon
                                        >
                                      </i>
                                      <template #tooltip> ขวางถนน </template>
                                    </vs-tooltip>
                                  </v-col>
                                  <v-col
                                    class="d-flex justify-center"
                                    cols="6"
                                    md="3"
                                  >
                                    <vs-tooltip>
                                      <i
                                        :class="
                                          'bx bx-restaurant ' +
                                          item.animateEat +
                                          ' bx-md'
                                        "
                                        :style="'color: ' + item.colorEat + ''"
                                      ></i>
                                      <template #tooltip> กินอาหาร </template>
                                    </vs-tooltip>
                                  </v-col>
                                  <v-col
                                    class="d-flex justify-center"
                                    cols="6"
                                    md="3"
                                  >
                                    <vs-tooltip>
                                      <i
                                        :class="
                                          'bx bxs-car-crash ' +
                                          item.animateDestroy +
                                          ' bx-md'
                                        "
                                        :style="
                                          'color: ' + item.colorDestroy + ''
                                        "
                                      ></i>
                                      <template #tooltip> ทำลายของ </template>
                                    </vs-tooltip>
                                  </v-col>
                                </v-row>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="12" sm="5">
                          <v-list-item-group>
                            <v-list-item-title>
                              <v-row class="h3 pt-1 title-text">
                                <v-col cols="8" md="4">{{ notice }}</v-col>
                                <v-col cols="4" md="8" class="text-right">
                                  <v-dialog
                                    v-model="
                                      dialogMoveToTrash[
                                        'dialog_' + item.reportId
                                      ]
                                    "
                                    max-width="400"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        style="margin: 1%"
                                        color="red"
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        <v-icon color="white">
                                          mdi-delete</v-icon
                                        >
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-title
                                        style="
                                          font-size: 16px;
                                          font-weight: bold;
                                        "
                                        class="justify-center"
                                      >
                                        {{ msg_dialog_trash }}
                                      </v-card-title>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="dark"
                                          text
                                          @click="
                                            dialogMoveToTrash[
                                              'dialog_' + item.reportId
                                            ] = false
                                          "
                                        >
                                          {{ cancel }}
                                        </v-btn>
                                        <v-btn
                                          color="red darken-1"
                                          text
                                          @click="moveToTrash(item.reportId)"
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
                                {{ item.reportDetails }}
                              </v-card>
                            </v-list-item-content>
                          </v-list-item-group>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      violentItems: [
        { violentTxt: 'มาก', violentVal: 2 },
        { violentTxt: 'ปานกลาง', violentVal: 1 },
        { violentTxt: 'น้อย', violentVal: 0 },
      ],
      dataImages: [],
      reportList: [],
      userReportList: [],
      dialogCreateMision: false,
      dialogError: false,
      tab: null,
      dialogConfirmCreateMission: false,
      dialogMoveToTrash: [],
      accept: 'ตกลง',
      cancel: 'ยกเลิก',
      items: ['รายละเอียดการแจ้งเหตุ', 'รายงานการแจ้งเหตุ'],
      imgElephant: 'ภาพเหตุการณ์',
      sceneOfaccident: 'จุดเกิดเหตุ',
      msg_dialog_trash: 'ท่านต้องการย้ายการแจ้งเตือนไปที่ถังขยะหรือไม่',
      situationTime: '',
      watcher: 'ผู้พบเห็น',
      notice: 'หมายเหตุ',
      markers: [],
      initLatLng: [{ latitude: 0, longitude: 0 }],
      /** Mission **/
      missionSelectedImg: [],
      missionNumberElephant: '',
      missionViolentLevel: '',
      missionLocationName: '',
      missionLocationNameShow: '',
      missionDetial: '',
      missionPinedLocation: [],
      selectedImages: '',
      place: null,
      locationPickerOptions: {
        map: {
          zoom: 14,
        },
        marker: {},
      },
    }
  },
  mounted() {
    this.initReport()
  },
  watch: {
    missionPinedLocation(val) {
      // console.log('A this.locationPickerOptions: ', this.locationPickerOptions)

      this.locationPickerOptions.map.zoom = 14

      // console.log('B this.locationPickerOptions: ', this.locationPickerOptions)
    },
  },
  methods: {
    async initReport() {
      const currentGroupId = this.$route.params.id
      await this.$fire.firestore
        .collection('reports')
        .where('locationGroupId', '==', currentGroupId)
        .orderBy('timeStamp', 'asc')
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach(async (change) => {
            // console.log(doc.id, '=>', doc.data())
            if (change.type === 'added') {
              const uid = change.doc.data().accountId
              const userInfo = await this.$fire.firestore
                .collection('users')
                .doc(uid)
                .get()

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
                console.log('elephantCharacteristics NOT NULL')
                elephantCharacterTmp = change.doc.data().elephantCharacteristics
              } else {
                elephantCharacterTmp = elephantCharacterTmpAllFalse
                console.log('elephantCharacteristics IS NULL')
              }

              console.log('elephantTmp: ', elephantCharacterTmp)

              const animateActive = 'bx-tada'
              const animateNoActive = ''
              const colorActive = 'red'
              const colorNoActive = 'grey'

              this.initLatLng.splice(0, 0, change.doc.data().pinLatLng)
              this.reportList.unshift({
                reportId: change.doc.data().reportId,
                accountID: change.doc.data().accountId,
                imgSrc: change.doc.data().imgSrc,
                photoURL: userInfo.data().photoURL,
                displayName: userInfo.data().displayName,
                timeStamp: this.convertDateTime(
                  change.doc.data().timeStamp.toDate()
                ),
                userTimeStamp: this.convertDateTime(
                  change.doc.data().userTimeStamp.toDate()
                ),
                locationName: change.doc.data().locationName,
                reportDetails: change.doc.data().reportDetails,
                pinLatLng: change.doc.data().pinLatLng,
                elephantCharacteristics: elephantCharacterTmp,
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

              console.log('DATA: ', this.reportList)

              this.missionLocationNameShow = change.doc.data().locationName

              this.situationTime = this.convertDateTime(
                change.doc.data().timeStamp.toDate()
              )
              // check exist user
              const existsUser = this.userReportList.some(
                (userReport) => userReport.photoURL === userInfo.data().photoURL
              )
              if (!existsUser)
                this.userReportList.unshift({
                  photoURL: userInfo.data().photoURL,
                })

              this.missionPinedLocation = {
                lat: change.doc.data().pinLatLng.latitude,
                lng: change.doc.data().pinLatLng.longitude,
              }

              this.dataImages.unshift({
                id: change.doc.data().reportId,
                src: change.doc.data().imgSrc,
                lat: change.doc.data().pinLatLng.latitude,
                lng: change.doc.data().pinLatLng.longitude,
              })
            }
            if (change.type === 'modified') {
              console.log('edit!')
            }
            if (change.type === 'removed') {
              let lastData = false
              const reportLength = await this.$fire.firestore
                .collection('reports')
                .where('locationGroupId', '==', this.$route.params.id)
                .get()
                .then((document) => document.docs.length)

              if (reportLength === 0) {
                console.log('reportLength.length: ', reportLength)
                lastData = true
              }

              const editedReport = change.doc.data()

              const indexOldReport = this.reportList.findIndex(
                (report) => report.reportId === editedReport.reportId
              )
              console.log('indexOldReport: ', indexOldReport)
              if (indexOldReport >= 0) {
                this.reportList.splice(indexOldReport, 1)
              }

              const indexOldImages = this.dataImages.findIndex(
                (Images) => Images.id === editedReport.reportId
              )

              if (indexOldImages >= 0) {
                this.dataImages.splice(indexOldImages, 1)
              }

              if (lastData) {
                this.$router.push('/report')
              }
            }
          })
        })
    },
    async createMission() {
      const data = {
        groupId: this.$route.params.id,
        details: this.missionDetial,
        imgSrc: this.missionSelectedImg.src,
        latitude: this.missionPinedLocation.lat,
        longitude: this.missionPinedLocation.lng,
        severity: this.missionViolentLevel,
        numberElephant: this.missionNumberElephant,
        locationName: this.missionLocationName,
      }
      if (
        data.locationName !== '' &&
        data.imgSrc !== '' &&
        data.details !== '' &&
        data.severity !== '' &&
        data.numberElephant !== ''
      ) {
        this.dialogConfirmCreateMission = true
        console.log(data)
        this.$axios.setHeader(
          'Content-Type',
          'application/x-www-form-urlencoded',
          ['post']
        )
        console.log('axios: ', this.$axios.defaults.baseURL)
        const res = await this.$axios.post(
          '/eletor/api/mission/createMission',
          data
        )
        console.log(res)
      } else {
        this.dialogError = true
      }
    },
    async moveToTrash(reportId) {
      const self = this
      console.log('reportId: ', reportId)
      await self.$fire.firestore
        .collection('reports')
        .doc(reportId.toString())
        .get()
        .then(async function (doc) {
          reportId = doc.data().reportId.toString()
          console.log(doc.data())
          // copy data to trash
          await self.$fire.firestore
            .collection('trashs')
            .doc(reportId)
            .set(doc.data())
            .then(function (doc) {
              // delete data to trash
              self.$fire.firestore
                .collection('reports')
                .doc(reportId)
                .delete()
                .then(function (doc) {
                  console.log('remove success')
                })
            })
        })
      this.dialogMoveToTrash['dialog_' + reportId] = false
    },
    onSelectImage(imageInfo) {
      this.missionSelectedImg = imageInfo
      this.missionPinedLocation = {
        lat: imageInfo.lat,
        lng: imageInfo.lng,
      }
      console.log(imageInfo)
    },
    onChangeLocation() {
      console.log(this.missionPinedLocation)
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
    goToReport() {
      this.$router.push({ path: 'report' })
      if (window.history.length > 2) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    createSuccess() {
      this.dialogConfirmCreateMission = false
      this.$router.push('/mission')
    },
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

.title-text {
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
}

/* image picker*/
.vue-select-image__item {
  margin-left: 0px;
}

.vue-select-image__thumbnail {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.055);
}
</style>
