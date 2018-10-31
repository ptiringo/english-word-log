import firebase from "firebase/app";
import "./firebase-init.js";

import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import router from "./router.js";

import "element-ui/lib/theme-chalk/index.css";

Vue.use(Vuex);
Vue.use(ElementUI);

const messages = {
  title: "英単語記録帳"
};

const app = new Vue({
  el: "#app",
  data: {
    messages: messages
  },
  computed: {
    logined: function() {
      return this.user != null;
    }
  },
  methods: {
    logout: function(event) {
      firebase.auth().signOut();
    }
  },
  router: router
});
