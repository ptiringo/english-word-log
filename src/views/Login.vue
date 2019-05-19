<template>
  <v-container fluid>
    <v-layout column align-center justify-center>
      <v-flex xs-12>
        <v-card flat color="rgba(0, 0, 0, 0.0)" width="300">
          <v-img src="static/goi_logo.png"></v-img>
        </v-card>
      </v-flex>
      <p class="title">goi notebook is the notebook for recording your new vocabularies</p>
      <v-flex xs-12>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
    </v-layout>
    <v-layout row align-center justify-center>
      <v-flex ma-2 xs-3>
        <v-card elevation="1">
          <v-card-text>aaa</v-card-text>
        </v-card>
      </v-flex>
      <v-flex ma-2 xs-3>
        <v-card elevation="1">
          <v-card-text>aaa</v-card-text>
        </v-card>
      </v-flex>
      <v-flex ma-2 xs-3>
        <v-card elevation="1">
          <v-card-text>aaa</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  mounted() {
    const instance = firebaseui.auth.AuthUI.getInstance();
    const el = "#firebaseui-auth-container";
    const config = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "https://english-word-log.tokyo/"
    };

    if (instance) {
      instance.reset();
      instance.start(el, config);
    } else {
      new firebaseui.auth.AuthUI(firebase.auth()).start(el, config);
    }
  }
};
</script>
