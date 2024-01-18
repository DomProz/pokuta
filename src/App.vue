<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <NavBar />
  <div class="container mt-3">
    <router-view></router-view>
  </div>
</template>