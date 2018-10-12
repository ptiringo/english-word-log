const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "https://english-word-log.tokyo/"
});