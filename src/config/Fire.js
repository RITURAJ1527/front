import firebase from 'firebase';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBcMphLl7vT-0i7mVgTSn7VK2iHACmcu2M",
  authDomain: "intern-backend-5ed07.firebaseapp.com",
  databaseURL: "https://intern-backend-5ed07.firebaseio.com",
  projectId: "intern-backend-5ed07",
  storageBucket: "intern-backend-5ed07.appspot.com",
  messagingSenderId: "915809671768",
  appId: "1:915809671768:web:6ab8be714dd1ac0e39082d",
  measurementId: "G-HGD7NRQ2L8"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;