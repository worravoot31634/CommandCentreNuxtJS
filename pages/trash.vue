<template>
  <v-container>
    <v-card class="my-10" style="padding: 2%">
      <v-card
        :key="index"
        v-for="(trash, index) in trashList"
        class="mt-10 mx-auto transition-swing rounded-xl"
        style="cursor: pointer; margin: 1%"
      >
        <v-container>
          <v-row>
            <v-col cols="6" sm="2">
              <v-img
                max-height="300"
                max-width="500"
                :src="trash.imgSrc"
              ></v-img>
            </v-col>
            <v-col cols="6" sm="4">
              <v-list-item>
                <v-avatar>
                  <img :src="trash.photoURL" />
                </v-avatar>
                <v-list-item-content class="px-2">
                  <v-list-item-title class="h3 pt-1">
                    {{ trash.displayName }}
                  </v-list-item-title>
                  <v-list-item-title class="pt-1">
                    {{ trash.locationName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="pt-1">
                    {{ trash.timeStamp }}
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
                            color="grey"
                            v-bind="attrs"
                            v-on="on"
                            ><v-icon color="white"> mdi-restore</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title
                            style="font-size: 16px; font-weight: bold"
                            class="justify-center"
                          >
                            {{ msg_dialog_restore }}
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialog = false"
                            >
                              {{ cancel }}
                            </v-btn>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialog = false"
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
                    {{ trash.detail }}
                  </v-card>
                </v-list-item-content>
              </v-list-item-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </v-container>
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
      msg_dialog_restore: 'ท่านต้องการย้ายการแจ้งเตือนหรือไม่',
      itemsImages: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      locationName: 'หมู่บ้านเขาใหญ่',
      situationTime: '30 กันยายน 2020 Time 15:52',
      watcher: 'ผู้พบเห็น',
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
      ],
      notice: 'หมายเหตุ',
      markers: [
        {
          position: { lat: 10, lng: 10 },
        },
      ],
      trashList: [],
    }
  },
  mounted() {
    this.getTrashs()
  },
  methods: {
    async getTrashs() {
      await this.$fire.firestore
        .collection('trashs')
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            const docData = change.doc.data()
            if (change.type === 'added') {
              console.log('Added: ', change.doc.data())
              this.getUserReport(docData.accountId, (eUser) => {
                this.trashList.push({
                  uid: docData.accountId,
                  imgSrc: docData.imgSrc,
                  locationName: docData.locationName,
                  missionId: docData.missionId,
                  detail: docData.reportDetails,
                  reportId: docData.reportId,
                  timeStamp: this.convertDateTime(docData.timeStamp.seconds),
                  displayName: eUser.displayName,
                  photoURL: eUser.photoURL,
                })
              })
              console.log('Trash List: ', this.trashList)
            }

            if (change.type === 'modified') {
              console.log('Modified: ', change.doc.data())
            }

            if (change.type === 'removed') {
              console.log('Removed: ', change.doc.data())
            }
          })
        })
    },
    async getUserReport(uid, callback) {
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .get()
        .then((docs) => {
          callback(docs.data())
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
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
