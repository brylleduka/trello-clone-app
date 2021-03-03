<template>
  <div>
    <v-form
      v-if="!loading"
      ref="form"
      v-model="valid"
      lazy-validation
      align-center
      @submit.prevent="toSignUp"
      @keydown.prevent.enter
    >
      <v-text-field
        v-model="user.username"
        :rules="notEmptyRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :rules="notEmptyRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.displayName"
        :rules="notEmptyRules"
        label="Display Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="notEmptyRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.confirmPassword"
        :rules="confirmPasswordRules"
        label="Confirm Password"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.imageUrl"
        :rules="notEmptyRules"
        label="Image URL"
        required
      ></v-text-field>

      <v-layout column align-center>
        <v-btn color="success" class="mr-4" type="submit" :disabled="!valid">
          SignUp
        </v-btn>
        <router-link to="/login" color="primary" class="mr-4"
          >Login</router-link
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
  name: "SignupForm",
  data: (vm) => ({
    valid: false,
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      imageUrl: "",
    },
    notEmptyRules,
    confirmPasswordRules: [
      (confirmPassword) =>
        confirmPassword === vm.user.password || "Password do not matched",
    ],
  }),
  computed: {
    ...mapState("users", { loading: "isCreatePending" }),
  },
  methods: {
    async toSignUp() {
      await this.$store.dispatch("account/signUp", {
        user: this.user,
        valid: this.valid,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
