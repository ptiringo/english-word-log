<template>
  <div>
    <!-- 単語登録フォーム -->
    <v-form>
      <v-container>
        <v-layout>
          <v-flex xs4>
            <v-text-field v-model="newWord" label="単語" ref="newWordTextField"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="newWordMeaning" label="意味"></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-text-field v-model.number="newWordLevel" label="レベル"></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn @click="addWord">登録</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <!-- 登録された単語の表示領域 -->
    <v-data-table :headers="headers" :items="sortedWords">
      <template v-slot:items="props">
        <td>{{ props.item.registeredAt | date }}</td>
        <td>{{ props.item.level }}</td>
        <td>{{ props.item.word }}</td>
        <td>{{ props.item.meaning }}</td>
        <td><a v-bind:href="`https://ejje.weblio.jp/content/${props.item.word}`">Weblio</a>, <a v-bind:href="`https://eow.alc.co.jp/search?q=${props.item.word}`">英辞郎</a>
        </td>
        <td>
          <v-btn v-on:click="deleteWord($event, props.item.id)">削除</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import firebase from "firebase/app";

const firestore = firebase.firestore();

export default {
  data: () => ({
    headers: [
      { text: "登録日", value: "registedAt" },
      { text: "レベル", value: "level" },
      { text: "単語", value: "word" },
      { text: "意味", value: "meaning" },
      { text: "リンク", value: "link" },
      { text: "削除", value: "delete" }
    ],
    words: [],
    newWord: "",
    newWordMeaning: "",
    newWordLevel: null
  }),
  computed: {
    sortedWords: function() {
      return this.words
        ? this.words.sort((a, b) => b.registeredAt - a.registeredAt)
        : null;
    }
  },
  created: function() {
    firestore
      .collection("users")
      .doc(this.$store.getters.user.uid)
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
  mounted: function() {
    this.$refs.newWordTextField.focus();
  },
  methods: {
    addWord: function(event) {
      const word = {
        word: this.newWord,
        meaning: this.newWordMeaning,
        level: this.newWordLevel,
        registeredAt: DateTime.local().toJSDate()
      };

      firestore
        .collection("users")
        .doc(this.$store.getters.user.uid)
        .collection("words")
        .add(word)
        .then(docRef => {
          word.id = docRef.id;
          word.registeredAt = DateTime.fromJSDate(word.registeredAt);
          this.words.push(word);
          this.newWord = this.newWordMeaning = this.newWordLevel = "";
          this.$refs.newWordTextField.focus();
        })
        .catch(error => console.error("Error adding document: ", error));
    },
    deleteWord: function(event, id) {
      const app = this;
      firestore
        .collection("users")
        .doc(this.$store.getters.user.uid)
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

