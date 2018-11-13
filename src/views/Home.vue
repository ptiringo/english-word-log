<template>
  <!DOCTYPE html>
  <html lang="ja">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="static/favicon.ico" type="image/x-icon">
    <title>英単語記録帳</title>
  </head>

  <body>
    <div id="app">
      <el-container>
        <el-aside id="side" width="200px">
          <el-menu id="menu" :router="true">
            <i class="el-icon-menu"></i>
            <span>英単語記録帳</span>
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span>Home</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header id="header">
            <router-link to="/login">ログイン</router-link><button type="button" v-show="logined" v-on:click="logout">ログアウト</button>
          </el-header>
          <el-main>
            <h1>{{ messages.title }}</h1>
            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </body>

  </html>
</template>

<script>
import { DateTime } from "luxon";
import firebase from "firebase/app";

const firestore = firebase.firestore();

const messages = {
  title: "英単語記録帳"
};

export default {
  data: () => ({
    messages: messages,
    words: [],
    user: null
  }),
  computed: {
    logined: function() {
      return this.user != null;
    },
    sortedWords: function() {
      return this.words
        ? this.words.sort((a, b) => b.registeredAt - a.registeredAt)
        : null;
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
    logout: function(event) {
      firebase.auth().signOut();
    },
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
    }
  },
  filters: {
    date: datetime => datetime.toFormat("yyyy/MM/dd")
  }
};
</script>

<style scoped>
#side {
  background-color: rgb(238, 241, 246);
  color: #333;
}
#menu {
  background-color: rgb(238, 241, 246);
  color: #333;
}
#header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
