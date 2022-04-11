<template>
  <base-card>
    <h2>Register Here</h2>
    <div class="root">
      <label>Full Name: </label>
       <p>
      <input type="text" placeholder="Full Name" v-model="fullname"/>
      </p><br>
      <label>Email: </label>
       <p>
      <input type="text" placeholder="Email" v-model="email"/>
      </p><br>
      <label>Password: </label>
      <p>
      <input type="password" placeholder="Password" v-model="password"/>
      </p><br>
      <label>Confirm Password: </label>
      <p>
      <input type="password" placeholder="Confirm Password" v-model="confirm"/>
      </p>
      <br>
      <base-button @click="register">Register</base-button><br>
      <br>
      <base-button @click="signWithGoogle">Sign in With Google</base-button>
    </div>
  </base-card>
</template>
<script  setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'
const fullname = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const router =useRouter()
const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    console.log("Successfully registered!");
    console.log(auth.currentUser)
    router.push('/feed')
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
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
div.error {
  color: #9f3a38;
}
</style>
