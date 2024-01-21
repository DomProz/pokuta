<script setup lang="ts">
import { ref } from "vue";
import { User } from "../../types/User.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LoginUserForm } from "../../types/LoginUserForm.ts";

const router = useRouter();
const store = useStore();

const loginUserForm = ref<LoginUserForm>({
  email: '',
  password: '',
});


const loginUser = async (e: Event) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, loginUserForm.value.email, loginUserForm.value.password)
      .then(async (userCredential) => {
        const user: User = {
          email: userCredential.user.email!,
          uid: userCredential.user.uid,
        }
        await store.dispatch('login', { user });
        await router.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert({ errorCode, errorMessage });
      });
}

</script>

<template>
  <h2>Login</h2>
  <form @submit="loginUser">
    <span class="text-danger" ref="passwordSpan"></span>
    <div class="row">
      <div class="col-lg-4">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" v-model="loginUserForm.email">
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="loginUserForm.password">
      </div>
    </div>

    <button type="submit" class="btn btn-primary mt-2">Login</button>
  </form>
</template>