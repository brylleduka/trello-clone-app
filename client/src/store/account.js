import router from "@/router";
import { models } from "../feathers-client";

const actions = {
  async login({ dispatch }, { user, valid }) {
    if (valid) {
      const auth = await dispatch(
        "auth/authenticate",
        {
          strategy: "local",
          ...user,
        },
        { root: true }
      );

      if (auth) router.push("/boards");
    }
  },

  async signUp(_, { user, valid }) {
    if (valid) {
      const { User } = models.api;

      const newUser = new User(user);
      const result = await newUser.save({});
      if (result) await router.push("/login");
    }
  },
};

export default {
  namespaced: true,
  actions,
};
