<template>
  <!-- TODO -->
  <v-card
    min-width="300px"
    @dragover="setDroppingList($event, list)"
    :class="{ 'teal lighten-4': droppingList == list }"
  >
    <v-card-title class="headline" v-text="list.name"></v-card-title>
    <v-card-subtitle v-if="cardsByListId[list._id]" class="list-card">
      <v-container v-for="card in cardsByListId[list._id]" :key="card._id">
        <v-card
          draggable="true"
          @dragstart="startDraggingCard(card)"
          @dragend="dropCard()"
          class="mb-2 drag-card"
        >
          <v-card-title>{{ card.title }}</v-card-title>
        </v-card>
      </v-container>
    </v-card-subtitle>
    <v-card-actions>
      <CreateCard
        :listId="list._id"
        :boardId="$route.params.id"
        :createActivity="createActivity"
      ></CreateCard>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CreateCard from "@/components/CreateCard.vue";

export default {
  name: "CardList",
  components: {
    CreateCard,
  },
  props: ["list", "createActivity"],
  data: () => ({
    droppingList: null,
    draggingCard: null,
  }),
  async mounted() {
    await this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });

    await this.findCards({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },

  methods: {
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),

    startDraggingCard(card) {
      this.draggingCard = card;
    },
    setDroppingList(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    async dropCard() {
      if (this.droppingList) {
        //Check if card is not on the same
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(
            (list) => list._id === this.draggingCard.listId
          );

          // const toList = this.lists.find(
          //   (list) => list._id === this.droppingList._id
          // );

          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();

          this.createActivity(
            `moved card **${this.draggingCard.title}** from **${fromList.name}** to **${this.droppingList.name}**`
          );
        }
      }

      this.droppingList = null;
      this.draggingCard = null;
    },
  },
  computed: {
    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
      listsError: "errorOnfind",
    }),
    ...mapState("cards", {
      cardsError: "errorOnfind",
    }),

    ...mapGetters("lists", { findListsInStore: "find" }),
    ...mapGetters("cards", { findCardsInStore: "find" }),

    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },

    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
  },
};
</script>
