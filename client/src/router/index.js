import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Boards from "../views/Boards.vue";
import Board from "../views/Board.vue";

import store from "@/store";

Vue.use(VueRouter);

function isLoggedIn(to, from, next) {
  store
    .dispatch("auth/authenticate")
    .then(() => {
      next();
    })
    .catch(() => {
      next("/login");
    });
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/boards",
    name: "Boards",
    component: Boards,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/board/:id",
    name: "Board",
    component: Board,
    beforeEnter: isLoggedIn,
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
