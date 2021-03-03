<template>
  <v-container
    fluid
    pa-15
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

    <v-layout fluid pa-5 my-5 id="slider" class="list-container">
      <v-row>
        <v-col cols="12">
          <v-alert
            v-if="boardsError"
            color="red"
            :value="!!boardsError"
            dense
            type="error"
            >{{ boardsError.message }}</v-alert
          >

          <v-progress-circular
            v-if="loadingBoard || loadingLists"
            :size="200"
            :width="7"
            color="green"
            indeterminate
          ></v-progress-circular>

          <v-container fluid class="d-inline-flex " v-if="!boardsError">
            <div v-for="list in lists" :key="list._id" class="mb-5 mr-5">
              <v-card
                min-width="300px"
                @dragover="setDroppingList($event, list)"
                :class="{ 'teal lighten-4': droppingList == list }"
              >
                <v-card-title
                  class="headline"
                  v-text="list.name"
                ></v-card-title>
                <v-card-subtitle
                  v-if="cardsByListId[list._id]"
                  class="list-card"
                >
                  <v-container
                    v-for="card in cardsByListId[list._id]"
                    :key="card._id"
                  >
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
            </div>

            <ListForm
              :creatingList="creatingList"
              :createActivity="createActivity"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-layout>
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

    await this.findActivities({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },

  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),
    ...mapActions("activities", { findActivities: "find" }),

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

    // Creating Activity logs
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex.api;
      const activity = await new Activity();
      activity.text = `**${this.user.user.displayName}** ${text}`;
      activity.boardId = this.$route.params.id;
      await activity.save();
    },
  },
  computed: {
    ...mapState("auth", { user: "payload" }),
    ...mapState("boards", {
      loadingBoard: "isGetPending",
      boardsError: "errorOnGet",
    }),

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

<style lang="scss" scoped>
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

.full-height {
  height: 100%;
  max-height: 100vh;
  background: #000;

  .list-container {
    width: 90%;
    height: 90%;
    overflow-y: auto;
  }
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
.list-card {
  max-height: 50vh;
  overflow-y: auto;
}
.drag-card {
  cursor: move;
}
</style>
