<template>
  <v-flex dense sm12 pa-2>
    <v-card pa-2 elevation="0">
      <!-- <v-card-title class="text-md">Create Card</v-card-title> -->
      <v-card-subtitle>
        <v-form
          ref="form"
          v-model="validCard"
          @submit.prevent="createCard"
          @keydown.prevent.enter
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :loading="creatingCard"
                flat
                v-model="card.title"
                label="Title"
                required
              >
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  slot="prepend"
                  icon
                  text
                  type="submit"
                  color="secondary"
                  small
                  left
                >
                  <v-icon dark>
                    mdi-card-plus
                  </v-icon>
                </v-btn>
              </v-text-field>
            </template>
            <span>New Card</span>
          </v-tooltip>
        </v-form>
      </v-card-subtitle>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  name: "create-card",
  props: ["listId", "boardId"],
  data: () => ({
    creatingCard: false,
    validCard: false,
    card: {
      title: "",
      description: "",
      members: [],
    },
    notEmptyRules: [(value) => !!value || "Can not be empty"],
  }),

  methods: {
    async createCard() {
      if (this.validCard) {
        const { Card } = this.$FeathersVuex.api;
        this.card.boardId = this.boardId;
        this.card.listId = this.listId;

        const card = await new Card(this.card);
        //load before save
        this.creatingCard = true;
        await card.save();
        //load false after save
        this.creatingCard = false;

        this.card = {
          title: "",

          members: [],
        };
      }
    },
  },
};
</script>
