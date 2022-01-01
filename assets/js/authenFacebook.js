
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
  import { FacebookAuthProvider ,getAuth,signInWithPopup ,getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBiukQ0erW77iRWHHXr7TIAp8E-UHQMQBY",
    authDomain: "authen-92808.firebaseapp.com",
    projectId: "authen-92808",
    storageBucket: "authen-92808.appspot.com",
    messagingSenderId: "183240344550",
    appId: "1:183240344550:web:987650b7cd1dfb05ee0c27",
    measurementId: "G-XYEZ9KMTQJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const provider = new FacebookAuthProvider(app);
  const auth = getAuth(app);
  provider.addScope('user_birthday');
  const facebookLogin = document.getElementById('facebookLogin')

  const facebookAuthen = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
        console.log(user);
        sessionStorage.setItem('sessionLogin',user.displayName)
        sessionStorage.setItem('imgLogin',user.photoURL)
        document.querySelector('.login__social').style.display = 'none'
        window.location = 'index.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('Error with Facebook');
    });
   
  }

  facebookLogin.onclick = () => {
    signOut(auth)
    facebookAuthen()
  }