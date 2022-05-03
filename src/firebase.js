// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByvtRitm0_ohufW5FLjnaEbo3gSShHal4",
  authDomain: "gowild-convrtx.firebaseapp.com",
  projectId: "gowild-convrtx",
  storageBucket: "gowild-convrtx.appspot.com",
  messagingSenderId: "223342894018",
  appId: "1:223342894018:web:5023a3252ae2a7cddbd45b",
  measurementId: "G-KYF8DZR143",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);

// apiKey: "AIzaSyCIag8Y1v3gmGnF55sGh4ocFnZq6qsEnKM",
//   authDomain: "guided-convrtx.firebaseapp.com",
//   projectId: "guided-convrtx",
//   storageBucket: "guided-convrtx.appspot.com",
//   messagingSenderId: "875562076914",
//   appId: "1:875562076914:web:0cb64901b4103bdd8b5e6b",
//   measurementId: "G-4D8CJQ4DW7",
// eslint-disable-next-line no-lone-blocks
{
  /* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyByvtRitm0_ohufW5FLjnaEbo3gSShHal4",
    authDomain: "gowild-convrtx.firebaseapp.com",
    projectId: "gowild-convrtx",
    storageBucket: "gowild-convrtx.appspot.com",
    messagingSenderId: "223342894018",
    appId: "1:223342894018:web:5023a3252ae2a7cddbd45b",
    measurementId: "G-KYF8DZR143"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> */
}
