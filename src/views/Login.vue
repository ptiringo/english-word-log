<template>
  <div id="firebaseui-auth-container"></div>
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
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
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
