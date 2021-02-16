<template>
  <div>
    <v-app-bar color="bar blue lighten-3 ">
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
      <v-avatar v-if="user">
        <img :src="user.user.imageUrl" :alt="user.user.displayName" />
      </v-avatar>
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
  color: #000 !important;
  font-weight: 700;
}
</style>
