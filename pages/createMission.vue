<template>
  <v-card color="basil">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card color="basil" flat>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title class="title-text">
                    {{ imgElephant }}
                  </v-card-title>
                  <v-carousel hide-delimiters height="300" style="padding: 2%">
                    <v-carousel-item
                      v-for="(item, i) in itemsImages"
                      :key="i"
                      :src="item.src"
                    ></v-carousel-item>
                  </v-carousel>
                  <v-card-title class="title-text">
                    {{ locationName }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ situationTime }}
                  </v-card-subtitle>
                  <v-card-title class="title-text">
                    {{ watcher }}
                  </v-card-title>
                  <v-col class="watcher-image">
                    <v-list-item-avatar
                      v-for="(image, index) in imageList"
                      :key="index"
                    >
                      <img :src="image.src" />
                    </v-list-item-avatar>
                  </v-col>

                  <!-- <v-card-actions class="justify-center">
                    <v-btn class="pa-0"> Normal </v-btn>
                    <v-btn class="pa-0"> Normal </v-btn>
                  </v-card-actions> -->
                  <v-row class="mt-10">
                    <v-col cols="12" md="16" align="center">
                      <v-btn class="px-8 mx-10"> กลับ </v-btn>
                      <v-btn class="px-2 mx-10" color="#B7D36A">
                        สร้างภารกิจ
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card>
                  <v-card-text class="title-text">
                    {{ sceneOfaccident }}
                  </v-card-text>
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
                      <v-list-item-title class="pt-1">
                        {{ locationName }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="pt-1">
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
                          <v-btn style="margin: 1%" color="red">
                            <v-icon color="white"> mdi-delete</v-icon>
                          </v-btn>
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
      tab: null,
      items: ['รายละเอียดการแจ้งเตือน', 'รายงานการแจ้งเตือน'],
      text: ['Jame', 'Logan'],
      text2: 'Suranaree University Of Technology',
      imgElephant: 'ภาพเหตุการณ์',
      sceneOfaccident: 'จุดเกิดเหตุ',
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
    }
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
