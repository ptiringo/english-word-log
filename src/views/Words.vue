<template>
<div>
    <!-- 単語登録フォーム -->
    <form v-on:submit.prevent="addWord">
      <label>単語 <input type="text" name="word"></label>
      <label>意味 <input type="text" name="meaning"></label>
      <label>レベル <input type="text" name="level"></label>
      <button type="submit">登録</button>
    </form>

    <!-- 登録された単語の表示領域 -->
    <table>
      <tr>
        <th>登録日</th>
        <th>レベル</th>
        <th>単語</th>
        <th>意味</th>
        <th>リンク</th>
        <th></th>
      </tr>
      <tr v-for="word in sortedWords" v-bind:key="word.id">
        <td>{{ word.registeredAt | date }}</td>
        <td>{{ word.level }}</td>
        <td>{{ word.word }}</td>
        <td>{{ word.meaning }}</td>
        <td><a v-bind:href="`https://ejje.weblio.jp/content/${word.word}`">Weblio</a>, <a v-bind:href="`https://eow.alc.co.jp/search?q=${word.word}`">英辞郎</a></td>
        <td><button type="button" v-on:click="deleteWord($event, word.id)">削除</button></td>
      </tr>
    </table>
</div>
</template>

<script>
import { DateTime } from "luxon";
import firebase from "firebase/app";

const firestore = firebase.firestore();

export default {
  data: () => ({
    words: [],
    user: null
  }),
  computed: {
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

