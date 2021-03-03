<template>
  <div>
    <v-app-bar color="blue darken-4" absolute dark elevate-on-scroll>
      <v-toolbar-title
        ><router-link to="/" color="white"
          >Trello Clone</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!user">
        <v-btn text color="white" elevation="0" :to="{ name: 'Signup' }"
          >Signup</v-btn
        >
        <v-btn
          text
          color="white"
          elevation="0"
          class="ml-5"
          :to="{ name: 'Login' }"
          >Login</v-btn
        >
      </v-toolbar-items>
      <div class="mr-3">
        <strong class="mr-3">{{ user && user.user.displayName }}</strong>
        <v-avatar v-if="user">
          <img :src="user.user.imageUrl" :alt="user.user.displayName" />
        </v-avatar>
      </div>

      <v-toolbar-items v-if="user" align-center>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              icon
              elevation="0"
              @click="logout"
              v-bind="attrs"
              v-on="on"
              class="font-weight-medium"
              ><v-icon dark>
                mdi-logout
              </v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <Drawer :drawer="drawer" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Drawer from "@/components/Drawer";

export default {
  name: "Header",
  components: {
    Drawer,
  },

  data: () => ({
    drawer: false,
  }),

  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");

      await this.$router.push("/login");
    },
  },

  computed: {
    ...mapState("auth", { user: "payload" }),
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
  font-weight: 700;
}
</style>
