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
          <el-header id="header"><button type="button" v-on:click="logout" v-show="$store.getters.logined">ログアウト</button>
          </el-header>
          <el-main>
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
import firebase from "firebase/app";

export default {
  methods: {
    logout: function(event) {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("Login"));
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
