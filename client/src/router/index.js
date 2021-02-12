import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  let scrollTo = 0;

  if (to.hash) {
    scrollTo = to.hash;
  } else if (savedPosition) {
    scrollTo = savedPosition.y;
  }

  return goTo(scrollTo);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
});

export default router;
