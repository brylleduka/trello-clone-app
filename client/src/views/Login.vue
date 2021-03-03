<template>
  <v-container fluid class="full-height">
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
<style scoped>
.full-height {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
