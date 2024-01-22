<script setup lang="ts">
import { ref } from "vue";
import { db } from "../../firebase.js";
import { collection, addDoc } from '@firebase/firestore';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

type CreatePost = {
  title: string,
  content: string,
  userId: string,
}

const createPostForm = ref<CreatePost>({
  title: '',
  content: '',
  userId: '',
});

const router = useRouter();
const store = useStore();

const createPost = async (e: Event) => {
  e.preventDefault();

  if (!store.state.isAuthenticated) {
    await router.push("/user/error");
    return;
  }

  const postCollection = collection(db, 'posts');

  try {
    const userId = store.state.user.uid;

    createPostForm.value.userId = userId;
    
    const docRef = await addDoc(postCollection, createPostForm.value);
    console.log("Document written with ID: ", docRef.id);

    await router.push("/post/list");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

</script>

<template>
<div class="container">
  <form @submit="createPost">
    <div class="row">
      <div class="col-md-6">
        <label for="title" class="form-label">Tytuł</label>
        <input type="text" class="form-control" id="title" v-model="createPostForm.title">
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <label for="content" class="form-label">Treść</label>
        <textarea type="text" class="form-control" id="content" v-model="createPostForm.content"></textarea>
      </div>
    </div>
    <button class="btn btn-primary mt-2" type="submit">Dodaj</button>
  </form>
</div>
</template>