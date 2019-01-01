import firebase from "firebase";

import Vue from "vue";
import VueRouter from "vue-router";

import Words from "./views/Words.vue";
import Login from "./views/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      name: "Login",
      path: "/login",
      component: Login
    },
    {
      name: "Home",
      path: "/home",
      component: Words,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth && currentUser) {
    next("home");
  } else {
    next();
  }
});

export default router;
