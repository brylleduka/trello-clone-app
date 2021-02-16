<template>
  <v-container
    fluid
    pa-12
    ma-0
    :style="{
      'background-image':
        'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(' +
        board.background +
        ')',
    }"
    class="full-height bg-image"
  >
    <h2 class="board-title" v-if="board">{{ board.name }}</h2>

    <v-slide-y-transition mode="out-in">
      <v-layout row align-center pa-5 my-5>
        <v-row dense>
          <ListForm :creatingList="creatingList" />
          <!-- Board Card -->
          <v-col cols="12" md="9" sm="12" align-self="center">
            <v-progress-circular
              v-if="loadingBoard || loadingLists"
              :size="200"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <v-container fluid v-if="!loadingLists">
              <v-row dense>
                <v-col v-for="list in lists" :key="list._id" col="12">
                  <v-card max-width="250px" min-width="90%">
                    <v-card-title v-text="list.name"></v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <!-- Board Card END -->
        </v-row>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ListForm from "@/components/ListForm.vue";

export default {
  name: "Board",
  components: { ListForm },
  data: () => ({
    board: {},
  }),
  async mounted() {
    this.board = await this.getBoard(this.$route.params.id, { query: {} });

    await this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },

  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
  },
  computed: {
    ...mapState("boards", {
      loadingBoard: "isGetPending",
    }),

    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
    }),

    ...mapGetters("lists", { findListsInStore: "find" }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
  },
};
</script>

<style lang="scss">
.full-height {
  min-height: 100vh;
}
.bg-image {
  background-size: cover;
  background-repeat: no-repeat;
}
.board-title {
  padding: 0 0.5em;
  color: rgb(255, 255, 255);
  font-size: 3em;
}
</style>