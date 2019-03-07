// Firebase
import firebase from "./firebase-init.js";

// Vue
import Vue from "vue";
import Router from "./router.js";
import Home from "./views/Home.vue";
import Store from "./store.js";

// Vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

let app = "";

firebase.auth().onAuthStateChanged(() => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    Store.commit("login", currentUser);
  }

  if (!app) {
    app = new Vue({
      el: "#app",
      render: h => h(Home),
      store: Store,
      router: Router
    });
  }
});
