// Initialize Firebase (YOUR OWN APP)

var firebaseConfig = {
  apiKey: "AIzaSyBUMkKW4CU7yK6Q2e3WnsCZ-Lrw0nqy0l4",
  authDomain: "melon-project.firebaseapp.com",
  databaseURL: "https://melon-project.firebaseio.com",
  projectId: "melon-project",
  storageBucket: "melon-project.appspot.com",
  messagingSenderId: "771323559704",
  appId: "1:771323559704:web:5fb09af382ff2536c6686d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
