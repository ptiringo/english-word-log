import firebase from "firebase/app";
import "./firebase-init.js";

import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

Vue.use(Vuex);

new firebaseui.auth.AuthUI(firebase.auth()).start(
  "#firebaseui-auth-container",
  {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "https://english-word-log.tokyo/"
  }
);

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
