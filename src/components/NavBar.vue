<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const logout = async () => {
  await store.dispatch('logout');
  await router.push("/");
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Post Blog Guns!</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/post/create" class="nav-link">Create Post</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/post/list" class="nav-link">Posts List</router-link>
          </li>
        </ul>
        <ul v-if="store.state.isAuthenticated" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link mx-2 text-uppercase" to="/user/info">{{ store.state.user.email }}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-2 text-uppercase" @click="logout">Logout</a>
          </li>
        </ul>
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <router-link to="/user/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>