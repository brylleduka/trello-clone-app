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
      <v-layout row pa-5 my-5>
        <v-progress-circular
          v-if="loadingBoard || loadingLists"
          :size="200"
          :width="7"
          color="green"
          indeterminate
        ></v-progress-circular>
        <pre>
          {{boardsError}}
         
        </pre>
        <!-- <pre>
           {{listsError}}
         
        </pre>
        <pre> {{cardsError}}</pre> -->
        <v-flex row>
          <div v-for="list in lists" :key="list._id" class="mb-3 mr-3">
            <v-card
              max-width="400px"
              min-width="300px"
              @dragover="setDroppingList($event, list)"
              :class="{ 'teal lighten-4': droppingList == list }"
            >
              <v-card-title class="headline" v-text="list.name"></v-card-title>
              <v-card-subtitle>
                <v-container>
                  <v-row dense v-if="cardsByListId[list._id]">
                    <v-col
                      v-for="card in cardsByListId[list._id]"
                      :key="card._id"
                      cols="12"
                    >
                      <v-card
                        draggable="true"
                        @dragstart="startDraggingCard(card)"
                        @dragend="dropCard()"
                        class="mb-2 drag-card"
                      >
                        <v-card-title>{{ card.title }}</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-subtitle>
              <v-card-actions>
                <create-card
                  :listId="list._id"
                  :boardId="$route.params.id"
                ></create-card>
              </v-card-actions>
            </v-card>
          </div>
          <ListForm :creatingList="creatingList" />
        </v-flex>

        <!-- <v-container fluid v-if="!loadingLists">
          <v-row dense>
            <v-col v-for="list in lists" :key="list._id" col="12">
              <v-card max-width="350px" min-width="150px">
                <v-card-title v-text="list.name"></v-card-title>
              </v-card>
            </v-col>
            <ListForm :creatingList="creatingList" />
          </v-row>
        </v-container> -->
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ListForm from "@/components/ListForm.vue";
import CreateCard from "@/components/CreateCard.vue";

export default {
  name: "Board",
  components: { ListForm, CreateCard },
  data: () => ({
    droppingList: null,
    draggingCard: null,
    board: {},
  }),
  async mounted() {
    this.board = await this.getBoard(this.$route.params.id, { query: {} });

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
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),
    startDraggingCard(card) {
      this.draggingCard = card;
    },
    setDroppingList(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    dropCard() {
      if (this.droppingList) {
        this.draggingCard.listId = this.droppingList._id;
        this.draggingCard.save();
      }

      this.droppingList = null;
      this.draggingCard = null;
    },
  },
  computed: {
    ...mapState("boards", {
      loadingBoard: "isGetPending",
      boardsError: 'errorOnGet'
    }),

    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
       listsError: 'errorOnfind'
    }),
        ...mapState("cards", {
  
       cardsError: 'errorOnfind'
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

<style lang="scss" scoped>
.full-height {
  border: 1px solid #000;

  height: 100%;
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
.drag-card {
  cursor: move;
}
</style>
