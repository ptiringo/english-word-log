<template>
  <v-container fluid>
    <v-layout column align-center justify-center>
      <v-flex xs-12>
        <v-card flat color="rgba(0, 0, 0, 0.0)" width="300">
          <v-img src="static/goi_logo.png"></v-img>
        </v-card>
      </v-flex>
      <p class="headline">goi notebook is the notebook for record vocabularies</p>
      <v-flex xs12>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
    </v-layout>
    <v-layout>
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
