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
                  <v-card max-width="250px" min-width="90%">
                    <v-img
                      :src="board.background"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                      <v-card-title v-text="board.name"></v-card-title>
                    </v-img>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            color="blue-grey"
                            class="ma-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                            :to="{ name: 'Board', params: { id: board._id } }"
                          >
                            <v-icon dark>mdi-view-list</v-icon>
                          </v-btn>
                        </template>
                        <span>View Board List</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            color="blue-grey"
                            class="ma-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon dark>mdi-trash-can</v-icon>
                          </v-btn>
                        </template>
                        <span>Delete Board</span>
                      </v-tooltip>
                    </v-card-actions>
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
import BoardForm from "@/components/BoardForm.vue";

export default {
  name: "Boards",
  components: { BoardForm },

  async mounted() {
    await this.findBoards({ query: {} });
  },

  methods: {
    ...mapActions("boards", { findBoards: "find" }),
  },
  computed: {
    ...mapState("boards", {
      loading: "isFindPending",
      creating: "isCreatePending",
    }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },
};
</script>
