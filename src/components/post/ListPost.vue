<script setup lang="ts">
import { onMounted, ref } from "vue";
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore';
import { db } from "../../firebase.js";
import { Post } from "../../types/Post";
import SinglePost from "./SinglePost.vue";

const posts = ref<Post[]>([]);
const isLoaded = ref(false);

onMounted(async () => {
  await loadPosts();
});

const loadPosts = async () => {
  const postCollection = collection(db, 'posts');
  const snapshot = await getDocs(postCollection);

  posts.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));

  isLoaded.value = true;
};

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
        <SinglePost
            :post="post"
            @post-deleted="async (id: string) => await deletePost(id)" />
      </div>
    </div>
  </div>
</template>