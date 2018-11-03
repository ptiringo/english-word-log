import Vue from "vue";
import VueRouter from "vue-router";

import Words from "./views/Words.vue";
import Login from "./views/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: Words },
    { path: "/login", component: Login }
  ]
});

export default router;
