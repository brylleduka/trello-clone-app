<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <SignupForm />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "Signup",
  components: { SignupForm },
};
</script>
