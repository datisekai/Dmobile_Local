
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
  import { GoogleAuthProvider,getAuth,signInWithRedirect,getRedirectResult,signInWithPopup,signOut  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
  const provider = new GoogleAuthProvider(app);
  const auth = getAuth(app);
  const googleLogin = document.getElementById('googleLogin')

  const googleAuthen = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      sessionStorage.setItem('sessionLogin',user.displayName)
      sessionStorage.setItem('imgLogin',user.photoURL)
      document.querySelector('.login__social').style.display = 'none'
      window.location = 'index.html'
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

   
  }

  googleLogin.onclick = () => {
    signOut(auth)
    googleAuthen()
  }
