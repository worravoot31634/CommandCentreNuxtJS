<template lang="html">
  <v-container>
    <v-card class="pa-6">
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleLoginClicked"> Login </v-btn></v-card
    >
  </v-container>
</template>

<script>
export default {
  layout: 'session',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { user: { email: this.email, password: this.password } },
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
