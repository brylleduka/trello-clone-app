<template>
  <v-container fluid class="full-height">
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
<style lang="scss" scoped>
.full-height {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
