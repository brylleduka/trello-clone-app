<template>
  <v-col cols="12" md="3" sm="12">
    <v-container>
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="headline">Create List</v-card-title>

        <!-- Form -->
        <v-card-subtitle>
          <v-form
            v-if="!creatingList"
            ref="form"
            v-model="validList"
            lazy-validation
            align-center
            @submit.prevent="createList"
            @keydown.prevent.enter
          >
            <v-text-field
              v-model="list.name"
              :rules="notEmptyRules"
              label="Name"
              required
            ></v-text-field>

            <v-card-actions>
              <v-btn
                color="teal darken-1"
                dark
                type="submit"
                :disabled="!validList"
                :ripple="true"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-subtitle>
      </v-card>
      <v-progress-circular
        v-if="creatingList"
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
  name: "ListForm",
  props: {
    creatingList: Boolean,
  },
  data: () => ({
    validList: false,
    list: {
      name: "",
      order: 0,
      archived: false,
    },
    notEmptyRules: [(value) => !!value || "Can not be empty"],
  }),

  methods: {
    async createList() {
      if (this.validList) {
        const { List } = this.$FeathersVuex.api;
        this.list.boardId = this.$route.params.id;

        const list = await new List(this.list);
        await list.save();

        this.list = {
          name: "",
          order: 0,
          archived: false,
        };
      }
    },
  },
};
</script>
