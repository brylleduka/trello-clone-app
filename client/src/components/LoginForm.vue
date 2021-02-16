<template>
  <div>
    <v-form
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

export default {
  name: "LoginForm",
  data: () => ({
    valid: false,
    user: {
      username: "",
      password: "",
    },
    notEmptyRules: [(value) => !!value || "Can not be empty"],
  }),
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
  },
  methods: {
    // ...mapActions("auth", ["authenticate"]),
    async login() {
      try {
        if (this.valid) {
          //option1
          // const auth = await this.authenticate({
          //   strategy: "local",
          //   ...this.user,
          // });

          //option2
          const auth = await this.$store.dispatch("auth/authenticate", {
            strategy: "local",
            ...this.user,
          });

          if (auth) await this.$router.push("/boards");
          // .then(() => {
          //   this.$router.push("/");
          // })
          // .catch((e) => {
          //   console.error("Authentication error", e);
          // });
        }
      } catch (error) {
        console.error("Authentication error", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
