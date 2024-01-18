<script setup lang="ts">

import { onMounted, ref } from "vue";
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore';
import { db } from "./firebase.js";

type Post = {
  id: string,
  title: string,
  content: string,
}

const posts = ref<Post[]>([]);
const isLoaded = ref(false);

const loadPosts = async () => {
  const postCollection = collection(db, 'posts');
  const snapshot = await getDocs(postCollection);

  posts.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));

  isLoaded.value = true;
};

onMounted(async () => {
  await loadPosts();
});

const deletePost = async (id: string) => {
  const postRef = doc(db, 'posts', id);

  try {
    await deleteDoc(postRef);
    console.log("Document successfully deleted!")
    await loadPosts();
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

</script>

<template>
  <div v-if="!isLoaded">
    <span>Loading...</span>
  </div>

  <div v-else>
    <div class="row">
      <div v-for="(post, index) in posts" :key="index" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <button @click="deletePost(post.id)" class="btn btn-danger">
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>