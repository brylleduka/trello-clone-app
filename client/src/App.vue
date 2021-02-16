<template>
  <v-app id="app">
    <Header />
    <router-view />
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
// import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
  },
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
