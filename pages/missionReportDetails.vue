<template>
  <v-card color="basil">
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
                      :src="item.img"
                    ></v-carousel-item>
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
                    <!-- <v-list-item-avatar
                      v-for="(image, index) in imageList"
                      :key="index"
                      class="pr-2 pl-2"
                    >
                      <img :src="image.src" />
                    </v-list-item-avatar> -->
                    <vs-avatar-group style="justify-content: left">
                      <vs-avatar
                        max="50"
                        v-for="(image, index) in imageList"
                        :key="index"
                      >
                        <img :src="image.src" alt="" />
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
                        <img :src="image.imageSrc" alt="" />
                      </vs-avatar>
                    </vs-avatar-group>
                  </v-col>
                  <v-row class="mt-1" style="padding: 3%">
                    <v-col cols="12" md="16" align="center">
                      <v-btn class="px-8 mx-10">
                        <v-card-text
                          style="
                            font-weight: bold;
                            font-size: 1.2rem;
                            font-family: 'Prompt';
                          "
                          >กลับ</v-card-text
                        >
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
        <v-card color="basil" flat>
          <v-card-title class="title-text">{{ sceneOfaccident }}</v-card-title>
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="6" sm="2">
                  <v-img
                    height="100%"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-list-item>
                    <v-avatar>
                      <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                      />
                    </v-avatar>
                    <v-list-item-content class="px-2">
                      <v-list-item-title class="h3 pt-1">
                        {{ text2 }}
                      </v-list-item-title>
                      <v-list-item-title class="title-text pt-1">
                        {{ locationName }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="subtitle-text pt-1">
                        {{ situationTime }}
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
                          <v-dialog v-model="dialog" persistent max-width="400">
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
                                  @click="dialog = false"
                                  class="title-text"
                                >
                                  {{ cancel }}
                                </v-btn>
                                <v-btn
                                  color="green darken-1"
                                  text
                                  @click="dialog = false"
                                  class="title-text"
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
                        Unexpected console statement no-consoleUnexpected
                        console statement no-consoleUnexpected console statement
                        no-consoleUnexpected console statement
                        no-consoleUnexpected console statement
                        no-consoleUnexpected console statement
                        no-consoleUnexpected console statement
                        no-consoleUnexpected console statement no-console
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
  data() {
    return {
      dialog: false,
      tab: null,
      accept: 'ตกลง',
      cancel: 'ยกเลิก',
      items: ['รายละเอียดการแจ้งเตือน', 'รายงานการแจ้งเตือน'],
      text: ['Jame', 'Logan'],
      text2: 'Suranaree University Of Technology',
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
      imageList: [
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
      ],
      notice: 'หมายเหตุ',
      markers: [
        {
          position: { lat: 10, lng: 10 },
        },
      ],
      missionId: '',
      missionInfo: [],
    }
  },
  mounted() {
    this.getMissionById()
  },
  methods: {
    matchHeight() {
      console.log('params: ', this.missionId)
      this.$store.dispatch('missionId')
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
            this.reportImages.push({ img: this.missionInfo.imgSrc })

            this.getAttendants(this.missionInfo.missionId)
          })
      } catch (error) {}
    },
    async getAttendants(missionId) {
      console.log('MissionID: ', missionId)
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
                this.attendantImages.splice(indexRemove, 1)
              })
            }
          })
        })
    },
    async getAttendantsInfo(documentRef, callback) {
      try {
        await documentRef.get().then((e) => {
          callback(e.data())
        })
      } catch (error) {}
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
  created() {
    console.log(this.$route.query.mission)
    this.missionId = this.$route.params.mission
    console.log('mission ', this.missionId)
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
</style>
