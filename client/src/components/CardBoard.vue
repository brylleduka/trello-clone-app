<template>
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
</template>

<script>
export default {
  name: "CardBoard",
  props: ["board"],
};
</script>
