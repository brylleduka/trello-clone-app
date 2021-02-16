<template>
  <v-col cols="12" md="3" sm="12">
    <v-container>
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="headline"> Create Board</v-card-title>

        <!-- Form -->
        <v-card-subtitle>
          <v-form
            v-if="!creating"
            ref="form"
            v-model="valid"
            lazy-validation
            align-center
            @submit.prevent="createBoard"
            @keydown.prevent.enter
          >
            <v-text-field
              v-model="board.name"
              :rules="notEmptyRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="board.background"
              label="Background"
            ></v-text-field>

            <v-card-actions>
              <v-btn
                color="teal darken-1"
                dark
                type="submit"
                :disabled="!valid"
                :ripple="true"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-subtitle>
      </v-card>
      <v-progress-circular
        v-if="creating"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-container>
  </v-col>
</template>

<script>
export default {
  name: "BoardForm",
  props: {
    creating: Boolean,
  },
  data: () => ({
    valid: false,
    board: {
      name: "",
      background: "",
    },
    notEmptyRules: [(value) => !!value || "Can not be empty"],
  }),

  methods: {
    async createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex.api;

        const board = await new Board(this.board);
        await board.save();

        this.board = {
          name: "",
          background: "",
        };
      }
    },
  },
};
</script>
