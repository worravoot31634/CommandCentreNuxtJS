<template>
  <v-container>
    <v-container class="justify-center">
      <v-row class="justify-center pa-4" dense>
        <v-col cols="11" black>
          <h2><v-icon>mdi-file-chart</v-icon> รายงานภารกิจ</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-card class="mx-auto pa-6">
      <div class="text-lg-h6">
        <v-row>
          <div>
            <v-card
              class="d-flex align-content-space-around flex-wrap"
              color="grey lighten-2"
              flat
              tile
            >
              <v-card class="pa-2" outlined> ช่วงข้อมูลที่ต้องการ </v-card>
              <v-card class="pa-2" outlined>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="เลือกวันที่"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateStart" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-card>
              <v-card class="pa-2" outlined> ถึง </v-card>
              <v-card class="pa-2" outlined>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dateEnd"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="เลือกวันที่"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-card>
              <v-card class="pa-2" outlined> ระดับความรุนแรง </v-card>
              <v-card class="pa-2" outlined>
                <v-select :items="violentType" label="เลือก" solo></v-select>
              </v-card>
            </v-card>
          </div>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    violentType: ['มาก', 'ปานกลาง', 'น้อย'],
  }),
}
</script>
