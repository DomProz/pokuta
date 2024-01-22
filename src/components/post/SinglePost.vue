<script setup lang="ts">
import { Post } from "../../types/Post";
import { useStore } from "vuex";

defineProps<{ post: Post }>();
const emit = defineEmits<{ (e: 'postDeleted', id: string): void }>();

const auth = useStore();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.content }}</p>
      <button
          v-if="post.userId === auth.state.user?.uid"
          @click="() => emit('postDeleted', post.id)"
          class="btn btn-danger">
        Usuń
      </button>
    </div>
  </div>
</template>