<template>
  <div>
    <v-app-bar color="bar indigo darken-1 " dense dark>
      <v-toolbar-title
        ><router-link to="/" color="white"
          >Trello Clone</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!user">
        <v-btn dense color="transparent" elevation="0" :to="{ name: 'Signup' }"
          >Signup</v-btn
        >
        <v-btn
          color="transparent"
          elevation="0"
          class="ml-5"
          :to="{ name: 'Login' }"
          >Login</v-btn
        >
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-btn color="transparent" elevation="0" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",

  data: () => ({}),
  computed: {
    ...mapState("auth", { user: "payload" }),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");

      await this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  padding: 0 4em;
}
a {
  text-decoration: none;
  color: #fff !important;
}
</style>
