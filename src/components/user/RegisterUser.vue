<script setup lang="ts">
import { ref } from "vue";
import { RegisterUserForm } from "../../types/RegisterUserForm.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { User } from "../../types/User.ts";


const store = useStore();
const router = useRouter();

const registerUserForm = ref<RegisterUserForm>({
  email: '',
  password: '',
  confirmPassword: '',
});

const passwordSpan = ref<HTMLElement | null>(null);

const registerUser = async (e: Event) => {
  e.preventDefault();

  if (registerUserForm.value.password !== registerUserForm.value.confirmPassword) {
    passwordSpan.value!.innerText = 'Passwords are not the same';
    return;
  }

  createUserWithEmailAndPassword(auth, registerUserForm.value.email, registerUserForm.value.password)
      .then(async (_) => {
        passwordSpan.value!.innerText = '';

        const user: User = {
          email: auth.currentUser?.email,
          uid: auth.currentUser?.uid,
        }

        await store.dispatch('login', { user });
        await router.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
}

</script>

<template>
  <h2>Register a new user</h2>
  <form @submit="registerUser">
    <span class="text-danger" ref="passwordSpan"></span>
    <div class="row">
      <div class="col-lg-4">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" v-model="registerUserForm.email">
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="registerUserForm.password">
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" id="confirmPassword" class="form-control" v-model="registerUserForm.confirmPassword">
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-2">Register</button>
  </form>
</template>