var DateTime = luxon.DateTime;

var firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

var messages = {
  title: "英単語記録帳"
};

var app = new Vue({
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
        querySnapshot.forEach(doc => this.words.push(doc.data()))
      );
  },
  methods: {
    addWord: function(event) {
      var form = event.target;
      var word = {
        word: form.word.value,
        meaning: form.meaning.value,
        level: form.level.value,
        registeredAt: DateTime.local().toJSDate()
      };
      words.push(word);

      firestore
        .collection("words")
        .add(word)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
});
