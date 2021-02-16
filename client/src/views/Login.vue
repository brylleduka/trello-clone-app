<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <LoginForm />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm },
};
</script>
