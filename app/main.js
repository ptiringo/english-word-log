const DateTime = luxon.DateTime;

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

const messages = {
  title: "英単語記録帳"
};

const app = new Vue({
  el: "#app",
  data: {
    messages: messages,
    words: []
  },
  created: function() {
    firestore
      .collection("words")
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => {
          this.words.push({
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

      words.push({
        word: form.word.value,
        meaning: form.meaning.value,
        level: form.level.value,
        registeredAt: DateTime.local().toJSDate()
      });

      firestore
        .collection("words")
        .add(word)
        .then(docRef => console.log("Document written with ID: ", docRef.id))
        .catch(error => console.error("Error adding document: ", error));
    }
  }
});
