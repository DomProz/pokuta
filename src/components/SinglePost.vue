<script setup lang="ts">
import { Post } from "../types/Post.ts";

defineProps<{ post: Post }>();
const emit = defineEmits<{ (e: 'postDeleted', id: string): void }>()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.content }}</p>
      <button
          @click="() => emit('postDeleted', post.id)"
          class="btn btn-danger">
        Usuń
      </button>
    </div>
  </div>
</template>