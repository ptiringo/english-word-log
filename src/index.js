// Firebase
import "./firebase-init.js";

// Vue
import Vue from "vue";
import Vuex from "vuex";
import Router from "./router.js";
import Home from "./views/Home.vue";

// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Vuex);
Vue.use(ElementUI);

const app = new Vue({
  el: "#app",
  render: h => h(Home),
  router: Router
});
