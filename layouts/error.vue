<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="action-center">
          <v-img
            max-height="auto"
            max-width="400"
            width="400"
            :src="require('../assets/images/elephant.png')"
          ></v-img>
        </v-col>
        <v-col class="text-center py-0">
          <h1>404 PAGE NOT FOUND</h1>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 5rem;
  color: white;
}
.action-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55vh;
}
</style>
