<template>
  <v-app id="app">
    <Header />

    <router-view />
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/views/Header.vue";
// import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header,
  },
  // computed: {
  //   ...mapState("auth", { user: "payload" }),
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
