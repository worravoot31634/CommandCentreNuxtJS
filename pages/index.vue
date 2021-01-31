<template lang="html">
  <v-container class="d-flex justify-center">
    <v-card class="d-flex justify-center pa-6" max-width="500">
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="userNameRules"
              label="ชื่อผู้ใช้"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="รหัสผ่าน"
              type="password"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" @click.stop.prevent="handleLoginClicked">
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'session',
  data: () => ({
    valid: false,
    email: '',
    userNameRules: [(v) => !!v || 'กรุณากรอกชื่อผู้ใช้'],
    password: '',
    passwordRules: [(v) => !!v || 'กรุณากรอกรหัสผ่าน'],
  }),
  methods: {
    handleLoginClicked() {
      if (this.email === 'protector1' && this.password === '1234') {
        this.$router.replace({ path: '/home' })
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
