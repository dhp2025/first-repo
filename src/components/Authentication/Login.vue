<template>
  <!-- lets use the base-card -->
  <base-card>
    <h2>Login Here</h2>
      <label>Email: </label>
      <p>
      <input type="text" placeholder="Email" v-model="email"/>
      </p><br>
      <label>Password: </label>
      <p>
      <input type="password" placeholder="Password" v-model="password"/>
      </p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <br>
        <base-button @click="login"> Login</base-button><br><br>
        <base-button @click="signWithGoogle">Sign in With Google</base-button>
  </base-card>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router'
const email = ref("");
const password = ref("");
const errMsg = ref()
const router =useRouter()
const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    console.log("Successfully Logged in!");
    console.log(auth.currentUser)
    router.push('/feed')
  })
  .catch((error) => {
    console.log(error.code);
    switch(error.code){
      case "auth/invalid-email":
        errMsg.value = "Invalid email";
        break;
      case "auth/user-not-found":
        errMsg.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errMsg.value = "Incorrect password";
        break;
      default:
        errMsg.value = "Email or password was incorrect";
        break;
    }
  });

};
const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log(result.user);
    router.push("/feed");
  })
  .catch((error) => {
  });
};
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}
input:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}
.form-control {
  margin: 1rem 0;
}
</style>
