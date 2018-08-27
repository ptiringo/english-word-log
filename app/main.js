var DateTime = luxon.DateTime;

var messages = {
  title: "英単語記録帳"
};

var words = [
  {
    word: "word",
    meaning: "単語",
    level: 1,
    registeredAt: DateTime.fromISO("2018-08-26T00:30:00Z")
  },
  {
    word: "meaning",
    meaning: "意味",
    level: 1,
    registeredAt: DateTime.fromISO("2018-08-26T00:40:00Z")
  },
  {
    word: "log",
    meaning: "記録",
    level: 3,
    registeredAt: DateTime.fromISO("2018-08-27T00:40:00Z")
  }
];

var app = new Vue({
  el: "#app",
  data: {
    messages: messages,
    words: words
  },
  methods: {
    addWord: function(event) {
      var form = event.target;
      words.push({
        word: form.word.value,
        meaning: form.meaning.value,
        level: form.level.value,
        registeredAt: DateTime.local()
      });
    }
  }
});
