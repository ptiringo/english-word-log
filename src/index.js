// Firebase
import firebase from "./firebase-init.js";

// Vue
import Vue from "vue";
import Router from "./router.js";
import Home from "./views/Home.vue";
import Store from "./store.js";

// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

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
