<template>
  <v-container>
    <v-overlay :value="isRestoreLoading" opacity="0.7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="full-height my-16" fluid v-if="!isTrashNull">
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
            >Empty Trash</v-card-title
          >
        </v-col>
      </v-row>
    </v-container>
    <v-card class="my-3 mx-3" style="padding: 2%" v-if="isTrashNull">
      <v-container class="justify-center">
        <v-row class="justify-center pa-2" dense>
          <v-col cols="11">
            <h2>
              <v-icon x-large>mdi-recycle</v-icon>
              ถังขยะ
            </h2>
          </v-col>
        </v-row>
      </v-container>
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
                width="100%"
                height="180"
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
                  <v-list-item-title class="pt-1">
                    จำนวนช้างที่พบ: {{ trash.elephantAmount }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="pt-1">
                    <v-row>
                      <v-col class="d-flex justify-center" cols="6" md="3">
                        <vs-tooltip>
                          <i
                            :style="'color: ' + trash.colorAngry + ''"
                            :class="
                              'bx bx-angry ' + trash.animateAngry + ' bx-md'
                            "
                          ></i>
                          <template #tooltip> ตกมัน </template>
                        </vs-tooltip>
                      </v-col>
                      <v-col class="d-flex justify-center" cols="6" md="3">
                        <vs-tooltip>
                          <i :class="'bx ' + trash.animateOnRoad + ''">
                            <v-icon large :color="trash.colorOnRoad">
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
                              'bx bx-restaurant ' + trash.animateEat + ' bx-md'
                            "
                            :style="'color: ' + trash.colorEat + ''"
                          ></i>
                          <template #tooltip> กินอาหาร </template>
                        </vs-tooltip>
                      </v-col>
                      <v-col class="d-flex justify-center" cols="6" md="3">
                        <vs-tooltip>
                          <i
                            :class="
                              'bx bxs-car-crash ' +
                              trash.animateDestroy +
                              ' bx-md'
                            "
                            :style="'color: ' + trash.colorDestroy + ''"
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
                        v-model="dialog['dialog_' + index]"
                        persistent
                        max-width="400"
                        :retain-focus="false"
                      >
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
                              @click="dialog['dialog_' + index] = false"
                            >
                              {{ cancel }}
                            </v-btn>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="restoreReport(index)"
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
      dialog: [],
      tab: null,
      accept: 'ตกลง',
      cancel: 'ยกเลิก',
      items: ['รายละเอียดการแจ้งเตือน', 'รายงานการแจ้งเตือน'],
      text: ['Jame', 'Logan'],
      text2: 'Suranaree University Of Technology',
      imgElephant: 'ภาพเหตุการณ์',
      sceneOfaccident: 'จุดเกิดเหตุ',
      msg_dialog_restore: 'ท่านต้องการย้ายการแจ้งเตือนหรือไม่',
      locationName: 'หมู่บ้านเขาใหญ่',
      situationTime: '30 กันยายน 2020 Time 15:52',
      watcher: 'ผู้พบเห็น',
      notice: 'หมายเหตุ',
      markers: [
        {
          position: { lat: 10, lng: 10 },
        },
      ],
      trashList: [],
      restoreTrashList: [],
      isRestoreLoading: false,
      isTrashNull: true,
    }
  },
  mounted() {
    this.getTrashs()
  },
  methods: {
    async getTrashs() {
      try {
        await this.$fire.firestore
          .collection('trashs')
          .onSnapshot((querySnapshot) => {
            console.log(querySnapshot)
            if (querySnapshot.empty === true) {
              this.isTrashNull = false
            }
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
                console.log('elephantCharacteristics NOT NULL')
                elephantCharacterTmp = change.doc.data().elephantCharacteristics
              } else {
                elephantCharacterTmp = elephantCharacterTmpAllFalse
                console.log('elephantCharacteristics IS NULL')
              }
              console.log('elephantTmp: ', elephantCharacterTmp)

              const animateActive = 'bx-tada'
              const animateNoActive = ''
              const colorActive = '#f05454'
              const colorNoActive = 'grey'

              if (change.type === 'added') {
                console.log('Added: ', change.doc.data())

                this.getUserReport(docData.accountId, (eUser) => {
                  this.restoreTrashList.push(docData)
                  this.trashList.push({
                    uid: docData.accountId,
                    imgSrc: docData.imgSrc,
                    locationName: docData.locationName,
                    missionId: docData.missionId,
                    detail: docData.reportDetails,
                    reportId: docData.reportId,
                    timeStamp: this.convertDateTime(docData.timeStamp.toDate()),
                    displayName: eUser.displayName,
                    photoURL: eUser.photoURL,
                    elephantAmount: change.doc.data().elephantAmount,
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

                  if (this.trashList.length === 0) {
                    this.isTrashNull = false
                  } else {
                    this.isTrashNull = true
                  }
                })
              }

              if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data())
              }

              if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data())

                const indexRestore = this.trashList.findIndex(
                  (trash) => trash.reportId === docData.reportId
                )
                this.trashList.splice(indexRestore, 1)
              }
            })
          })
      } catch (error) {
        console.log('Error get trash: ', error)
      }
    },
    restoreReport(index) {
      try {
        this.dialog['dialog_' + index] = false
        this.isRestoreLoading = true
        const reportId = this.restoreTrashList[index].reportId
        const reportRestore = this.restoreTrashList[index]

        this.setRestoreReport(reportId, reportRestore, async () => {
          await this.$fire.firestore
            .collection('trashs')
            .where('reportId', '==', reportId)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.delete()
                this.isRestoreLoading = false
              })
            })
        })
      } catch (error) {
        console.log('Erorr restore report: ', error)
      }
    },
    async setRestoreReport(reportId, reportRestore, callback) {
      try {
        console.log(reportId, reportRestore)
        await this.$fire.firestore
          .collection('reports')
          .doc(reportId.toString())
          .set(reportRestore)
          .then(() => {
            callback()
          })
      } catch (error) {
        console.log('Error set restore report: ', error)
      }
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
