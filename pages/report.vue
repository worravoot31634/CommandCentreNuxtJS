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
                          :src="item.img"
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
                      cols="1"
                      style="
                        min-width: 100px;
                        max-width: 100%;
                        min-height: 100%;
                        height: 100%;
                      "
                      class="flex-grow-0 flex-shrink-1"
                    >
                      <div fluid>
                        <v-btn class="ml-2 mt-3" fab icon>
                          <v-icon>mdi-file-chart</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-hover>
          </v-container>
        </v-col>
      </v-row>
      <v-container>
        <v-data-table
          :items="reportList"
          :items-per-page="perPage"
          :hide-default-footer="true"
          :loading="isLoad"
          class="elevation-1"
        ></v-data-table>
      </v-container>
      <div class="text-center">
        <v-pagination
          v-model="page"
          class="mt-2"
          :length="totalPage"
          :total-visible="7"
          @input="inputData"
          @next="nextData"
          @previous="previousData"
        ></v-pagination>
      </div>
    </v-card>
    <p>totalPage: {{ totalPage }}</p>
    <p>totalItems: {{ totalItems }}</p>
    <p>limit: {{ limit }}</p>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    perPage: 5, // จำนวนข้อมูลต่อหน้า
    totalPage: 0, // จำนวนหน้า
    limit: 5, //
    page: 1,
    totalItems: 0, // จำนวนข้อมูลทั้งหมด
    isLoad: true,
    reportList: [],
  }),
  mounted() {
    this.initData()
  },
  methods: {
    previousData() {
      // ฟังก์ชั่นกดปุ่มย้อนกลับ
      console.log('previousData: ')
      this.fetchReport({ page: this.page - 1, limit: 5 })
      // ใน firestore ผมให้เริ่มที่หน้า 0 ทำให้ทุกครั้งที่กดเปลี่ยนผมต้องลบออก 1
    },
    nextData() {
      // ฟังก์ชั่นกดปุ่มถัดไป
      console.log('nextData: ')
      this.fetchReport({ page: this.page - 1, limit: 5 })
      // ใน firestore ผมให้เริ่มที่หน้า 0 ทำให้ทุกครั้งที่กดเปลี่ยนผมต้องลบออก 1
    },
    inputData(value) {
      console.log('inputData: ' + value)
      this.page = value
      this.fetchReport({ page: this.page - 1, limit: 5 })
      // ใน firestore ผมให้เริ่มที่หน้า 0 ทำให้ทุกครั้งที่กดเปลี่ยนผมต้องลบออก 1
    },
    async initData() {
      // ฟังก์ชั่นแรกที่เข้ามาใน component ครับ
      const totalReport = await this.$fire.firestore
        .collection('reports')
        .get()
        .then((document) => document.docs.length)
      this.totalPage = Math.ceil(totalReport / this.limit)
      console.log('totalReport: ' + totalReport)
      console.log('this.limit: ' + this.limit)
      // จำนวนหน้าผมดึงจำนวนข้อมูลทั้งหมด หารด้วย จำนวนข้อมูลต่อหน้าแล้วปัดขึ้นจะได้จำนวนหน้าทั้งหมด
      this.totalItems = totalReport
      // ข้อมูลทั้งหมด

      const indexOf = 0
      // index สำหรับที่่เราต้องการให้เริ่ม ผมใส่ 0 เพราะเข้ามาครั้งแรกให้เริ่มข้อมูล index 0
      const get = this.$fire.firestore
        .collection('reports')
        .orderBy('timeStamp', 'asc')
      return await get
        .get()
        .then(async (document) => {
          const last = document.docs[indexOf]
          console.log('last' + last)
          await this.$fire.firestore
            .collection('reports')
            .orderBy('timeStamp', 'asc')
            .startAt(last)
            .limit(this.limit)
            .get()
            .then((data) => {
              const list = []
              data.forEach((v) => {
                list.push({
                  reportId: +v.reportId,
                  img: v.data().imgSrc,
                  locationName: v.data().locationName,
                  timeStamp: v.data().timeStamp,
                })
                console.log(v.data().imgSrc)
              })
              console.log('list => ' + list)
              this.reportList = list
              this.isLoad = false
            })
          console.log('reportList[0].imgSrc: ', this.reportList[0].img)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async fetchReport({ page = 0, limit = 5 }) {
      console.log('called')
      this.isLoad = true
      const indexOf = this.totalPage * page
      console.log('totalPage: ' + this.totalPage)
      console.log('page ' + page)
      // เอาจำนวนต่อหน้า * หน้าที่ต้องการเริ่มเราจะได้ index ที่จะ start ออกมา เช่น หน้า 1 ต่อ 20 ข้อมูล จะได้ 1*20 =20
      // start index 20
      const get = await this.$fire.firestore
        .collection('reports')
        .orderBy('timeStamp', 'asc')
      return get
        .get()
        .then((document) => {
          const last = document.docs[indexOf]
          console.log('last ' + last)
          this.$fire.firestore
            .collection('reports')
            .orderBy('timeStamp', 'asc')
            .startAt(last)
            .limit(limit)
            .get()
            .then((data) => {
              const List = []
              data.forEach((v) => {
                List.push({
                  reportId: +v.reportId,
                  img: v.data().imgSrc,
                  locationName: v.data().locationName,
                  timeStamp: v.data().timeStamp,
                })
              })
              this.reportList = List
              console.log(this.reportList)
              this.isLoad = false
            })
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    // async getReport() {
    //   try {
    //     await this.$fire.firestore
    //       .collection('reports')
    //       .onSnapshot((querySnapshot) => {
    //         querySnapshot.docChanges().forEach((change) => {
    //           if (change.type === 'added') {
    //             console.log('Added: ', change.doc.data())
    //           }
    //           if (change.type === 'modified') {
    //             console.log('Modified: ', change.doc.data())
    //           }
    //           if (change.type === 'removed') {
    //             console.log('Removed: ', change.doc.data())
    //           }
    //         })
    //         console.log(querySnapshot.docs.data())
    //       })
    //   } catch (e) {}
    // },
    getIndex(index) {
      console.log('index is ' + index)
    },
  },
}
</script>
