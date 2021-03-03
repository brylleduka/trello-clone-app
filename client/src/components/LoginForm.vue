<template>
  <div>
    <v-form
      y-12
      v-if="!loading"
      ref="form"
      v-model="valid"
      lazy-validation
      align-center
      @submit.prevent="login"
      @keydown.prevent.enter
    >
      <v-text-field
        v-model="user.username"
        :rules="notEmptyRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="notEmptyRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-layout column align-center>
        <v-btn color="success" class="mr-4" type="submit" :disabled="!valid">
          Login
        </v-btn>
        <router-link to="/signup" color="primary" class="mr-4"
          >Signup</router-link
        >
      </v-layout>
    </v-form>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { notEmptyRules } from "@/utils/validators.js";

export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    user: {
      username: "",
      password: "",
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
  },
  methods: {
    // ...mapActions("auth", ["authenticate"]),
    async login() {
      try {
        await this.$store.dispatch("account/login", {
          valid: this.valid,
          user: this.user,
        });

        // if (auth) await this.$router.push("/boards");
      } catch (error) {
        console.error("Authentication error", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
