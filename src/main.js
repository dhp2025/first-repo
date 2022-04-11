import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard'
import BaseButton from './components/UI/BaseButton'
import Vue from 'vue';
import Vuelidate from "vuelidate";
import router from './router'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBYLztdUsKeqW06pvn8V2ggtgfJr_vPBT4",
  authDomain: "first-project-d3032.firebaseapp.com",
  projectId: "first-project-d3032",
  storageBucket: "first-project-d3032.appspot.com",
  messagingSenderId: "713691990656",
  appId: "1:713691990656:web:6d037bc203aebd25a47465"
}
initializeApp(firebaseConfig);
const app = createApp(App);
//register base card as global component
app.component('base-card',BaseCard);
app.component('base-button', BaseButton);
app.use(router).mount('#app')
