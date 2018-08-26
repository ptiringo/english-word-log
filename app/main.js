var app = new Vue({
  el: "#app",
  data: {
    message: {
      title: "英単語記録帳"
    },
    words: [
      {
        word: "word",
        meaning: "単語",
        level: 1,
        registeredAt: "2018-08-26T00:30:00Z"
      },
      {
        word: "meaning",
        meaning: "意味",
        level: 1,
        registeredAt: "2018-08-26T00:40:00Z"
      },
      {
        word: "log",
        meaning: "記録",
        level: 3,
        registeredAt: "2018-08-27T00:40:00Z"
      }
    ]
  },
  methods: {
    addWord: function(event) {
      console.log(event.target);
    }
  }
});
