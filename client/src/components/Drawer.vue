<template>
  <v-navigation-drawer
    v-model="drawer"
    right
    absolute
    hide-overlay
    width="350"
    class="activity-drawer"
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

        <v-list-item-content>
          <v-list-item-title
            v-text="activity.user.displayName"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-html="markdownify(activity.text)"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import marked from "marked";
import { mapGetters } from "vuex";
export default {
  name: "Drawer",
  props: {
    drawer: Boolean,
  },

  methods: {
    markdownify(text) {
      return marked(text);
    },
  },
  computed: {
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
.activity-drawer {
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 3px rgb(11, 70, 126);
    -webkit-box-shadow: inset 0 0 3px rgba(11, 70, 126, 1);
    background: rgb(54, 134, 209);
  }
}
</style>
