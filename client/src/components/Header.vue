<template>
  <div>
    <v-app-bar color="blue darken-4" dark elevate-on-scroll>
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

    <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      temporary
      hide-overlay
      width="350"
    >
      <v-list-item class="px-2">
        <v-list-item-title>Activities</v-list-item-title>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-list dense three-line>
        <v-list-item v-for="activity in activitiesByDate" :key="activity._id">
          <v-list-item-icon>
            <v-icon color="green">
              mdi-ticket
            </v-icon>
          </v-list-item-icon>

          <!-- <v-list-item-content>
            <v-list-item-title
              v-text="activity.user.displayName"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-html="markdownify(activity.text)"
            ></v-list-item-subtitle>
          </v-list-item-content> -->
          <div>
            <h4>{{ activity.user.displayName }}</h4>
            <div
              v-html="markdownify(activity.text)"
              style="word-wrap: break-word; max-width: 200px"
            ></div>
          </div>

          <v-list-item-avatar>
            <v-img :src="activity.user.imageUrl"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import marked from "marked";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",

  data: () => ({
    drawer: false,
  }),

  methods: {
    markdownify(text) {
      return marked(text);
    },
    async logout() {
      await this.$store.dispatch("auth/logout");

      await this.$router.push("/login");
    },
  },

  computed: {
    ...mapState("auth", { user: "payload" }),

    ...mapGetters("activities", { findActivitiesInStore: "find" }),

    activities() {
      return this.findActivitiesInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    activitiesByDate() {
      return this.activities.slice().reverse();
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
  font-weight: 700;
}
</style>
