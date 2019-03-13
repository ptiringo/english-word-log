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
      <v-app>
        <v-container>
          <v-toolbar absolute dark app>
            <v-toolbar-title>英単語記録帳</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="logout" v-show="$store.getters.logined">
              logout<v-icon right>logout</v-icon>
            </v-btn>
          </v-toolbar>
          <v-content>
            <router-view />
          </v-content>
        </v-container>
      </v-app>
    </div>
  </body>

  </html>
</template>

<script>
import firebase from "firebase/app";

export default {
  methods: {
    logout: function(event) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("logout");
          this.$router.replace("Login");
        });
    }
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
