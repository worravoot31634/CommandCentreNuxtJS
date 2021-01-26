<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-container>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/eletor-e20d1.appspot.com/o/icon%2Feletor_icons.png?alt=media&token=56fcee97-05fa-4878-a4d5-87f682de6283"
          max-height="70"
        ></v-img
      ></v-container>
      <!-- <v-toolbar-title class="navTitle" fill-height v-text="title" /> -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->

      <!-- <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-map',
          title: 'แผนที่',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ภารกิจ',
          to: '/mission',
        },
        {
          icon: 'mdi-bell',
          title: 'การแจ้งเหตุ',
          to: '/report',
        },
        {
          icon: 'mdi-file-chart',
          title: 'รายงานภารกิจ',
          to: '/missionReport',
        },
        {
          icon: 'mdi-trash-can',
          title: 'ถังขยะ',
          to: '/trash',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Elector',
    }
  },
}
</script>
<style>
/* .GMap__Wrapper {
  width: 100%;
  height: 100%;
}
.GMap,
p {
  width: 100%;
  height: 100%;
  position: absolute;
} */
.theme--light.v-application {
  background-color: #68783c;
}
.theme--dark.v-application {
  background-color: #68783c;
}
.navTitle {
  height: 64px;
}

/* .container {
  margin-left: 0px;
  padding: 0px;
} */
</style>
