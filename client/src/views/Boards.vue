<template>
  <v-container fluid pa-12>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center pa-5 my-5>
        <v-progress-circular
          v-if="loading"
          :size="200"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-row dense>
          <BoardForm :creating="creating" />
          <!-- Board Card -->
          <v-col cols="12" md="9" sm="12" align-self="center">
            <v-container fluid v-if="!loading">
              <v-row dense>
                <v-col v-for="board in boards" :key="board._id" col="12">
                  <CardBoard :board="board" />
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
import BoardForm from "@/components/BoardForm.vue";
import CardBoard from "@/components/CardBoard.vue";

export default {
  name: "Boards",
  components: { BoardForm, CardBoard },

  async mounted() {
    await this.findBoards({ query: {} });
  },

  methods: {
    ...mapActions("boards", { findBoards: "find" }),
  },
  computed: {
    ...mapState("auth", { user: "payload" }),
    ...mapState("boards", {
      loading: "isFindPending",
      creating: "isCreatePending",
    }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      return this.findBoardsInStore({ query: { ownerId: this.user.user._id } })
        .data;
    },
  },
};
</script>
