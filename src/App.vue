<template>
  <div>
    <TheHeader :title="title" />
    <div class="container">
      <base-card>
        <nav>
        <base-button @click="switchTab('home')" :mode="setHomeActiveTab">Home</base-button>
        <!--<router-link to="/login">-->
        <base-button @click="switchTab('login')" :mode="setLoginActiveTab">Login</base-button>
        <!--</router-link>-->
        <!--<router-link to="/register">-->
        <base-button @click="switchTab('register')" :mode="setRegisterActiveTab">Register</base-button>
        <!--</router-link>-->
        <router-link to="/feed">
        <base-button @click="switchTab('feed')" :mode="setFeedActiveTab">Feed</base-button>
        </router-link>
        <base-button @click="handleSignOut" :mode="setHomeActiveTab" v-if="isLoggedIn">Sign out</base-button>
        </nav>
      </base-card>
      <keep-alive>
        <component :is="selectedTab"></component>
      </keep-alive>
      <!-- Now Lets have them switch component -->
    </div>
  </div>
  <router-view />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter();
const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
<script>
import TheHeader from "./components/Layouts/TheHeader";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./views/Home";


export default {
  
  name: "App",
  components: {
    TheHeader,
    Login,
    Register
  },
  data() {
    return {
      title: "Application",
      selectedTab: "login"
    };
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab;
    }
  },
  computed: {
    setLoginActiveTab(){
      return this.selectedTab === 'login' ? '' : 'default';
    },
    setRegisterActiveTab() {
      return this.selectedTab === 'register' ? '' : 'default';
    },
    setHomeActiveTab() {
      return this.selectedTab === 'home' ? '' : 'default';
    },
    setFeedActiveTab() {
      return this.selectedTab === 'feed' ? '' : 'default';
    },
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");
* {
  margin: 0;
  box-sizing: border-box;
}
body,
html {
  font-family: "Open Sans", sans-serif;
}
.container {
  width: 90%;
  margin: 0 auto;
}
</style>