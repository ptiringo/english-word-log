import Vue from "vue";
import { DateTime } from "luxon";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import router from "./router.js";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC5FYU6otVNVX7KBjN_0p2yF8AvAHOY0FU",
  authDomain: "english-word-log.firebaseapp.com",
  databaseURL: "https://english-word-log.firebaseio.com",
  projectId: "english-word-log",
  storageBucket: "english-word-log.appspot.com",
  messagingSenderId: "913767669176"
});

new firebaseui.auth.AuthUI(firebase.auth()).start(
  "#firebaseui-auth-container",
  {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "https://english-word-log.tokyo/"
  }
);

const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

const messages = {
  title: "英単語記録帳"
};

const app = new Vue({
  el: "#app",
  // render: h => h(App),
  router: router,
  data: {
    messages: messages,
    words: [],
    user: null
  },
  computed: {
    sortedWords: function() {
      return this.words
        ? this.words.sort((a, b) => b.registeredAt - a.registeredAt)
        : null;
    },
    logined: function() {
      return this.user != null;
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });

    firestore
      .collection("words")
      .orderBy("registeredAt", "desc")
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => {
          this.words.push({
            id: doc.id,
            word: doc.get("word"),
            meaning: doc.get("meaning"),
            level: doc.get("level"),
            registeredAt: DateTime.fromJSDate(doc.get("registeredAt").toDate())
          });
        })
      );
  },
  methods: {
    addWord: function(event) {
      const form = event.target;
      const word = {
        word: form.word.value,
        meaning: form.meaning.value,
        level: form.level.value,
        registeredAt: DateTime.local().toJSDate()
      };

      firestore
        .collection("words")
        .add(word)
        .then(docRef => {
          word.id = docRef.id;
          word.registeredAt = DateTime.fromJSDate(word.registeredAt);
          this.words.push(word);
        })
        .catch(error => console.error("Error adding document: ", error));
    },
    deleteWord: function(event, id) {
      const app = this;
      firestore
        .collection("words")
        .doc(id)
        .delete()
        .then(() => (app.words = app.words.filter(x => x.id != id)))
        .catch(error => console.error("Error removing document: ", error));
    },
    logout: function(event) {
      firebase.auth().signOut();
    }
  },
  filters: {
    date: datetime => datetime.toFormat("yyyy/MM/dd")
  }
});
