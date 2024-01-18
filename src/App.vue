<template>
  <div class="container mt-5">
    <h1 class="mb-4">Blog</h1>
    <div class="mb-3">
      <label for="postTitle" class="form-label">Tytuł:</label>
      <input
        id="postTitle"
        v-model="newPost.title"
        class="form-control"
        placeholder="Tytuł"
      />
    </div>
    <div class="mb-3">
      <label for="postContent" class="form-label">Treść:</label>
      <textarea
        id="postContent"
        v-model="newPost.content"
        class="form-control"
        placeholder="Treść"
      ></textarea>
    </div>
    <button @click="addPost" class="btn btn-primary">Dodaj post</button>
    <div v-if="emitMessage">
      <p class="mt-3">{{ emitMessage }}</p>
    </div>

    <p class="mt-3">Liczba postów: {{ postCount }}</p>
    <ul class="list-group mt-3">
      <li
        v-for="(post, index) in posts"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <h3 class="mb-0">
            <strong>{{ post.title }}</strong>
          </h3>
          <p>Data dodania: {{ formatPostDate(post.date) }}</p>
        </div>
        <div>
          <button @click="editPost(index)" class="btn btn-warning me-2">
            Edytuj
          </button>
          <button @click="deletePost(index)" class="btn btn-danger">
            Usuń
          </button>
          <button @click="showPostDetails(index)" class="btn btn-info">
            Szczegóły postu
          </button>
        </div>
      </li>
    </ul>

    <div v-if="selectedPost !== null">
      <h2 class="mt-3">{{ selectedPost.title }}</h2>
      <p>ID postu: {{ selectedPost.id }}</p>
      <p>Treść: {{ selectedPost.content }}</p>
      <button @click="selectedPost = null" class="btn btn-info">
        Powrót do listy
      </button>
    </div>
  </div>
  <div>
    <component v-bind:is="component"></component>
    <button v-on:click="component = 'pict-one'">Zdjecie1</button>
    <button v-on:click="component = 'pict-two'">Zdjecie2</button>
  </div>
  <captioned-content>
    <template #caption
      >Source: <a href="https://militaria.pl/">Militaria</a>
    </template>
  </captioned-content>
</template>

<script>
import { db } from "./components/firebase.js";
import CaptionedContent from "./components/CaptionedContent.vue";
import PictOne from "./components/Pict1.vue";
import PictTwo from "./components/Pict2.vue";
import { ref, computed, defineProps, defineEmits } from "vue";
import { groupBy, sortBy, uniqBy } from "lodash";
import { getDatabase, ref as dbRef, push, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    CaptionedContent,
    "pict-one": PictOne,
    "pict-two": PictTwo,
  },
  data() {
    return {
      component: "pict-one",
    };
  },
  props: {
    // Props do ustawienia początkowego posta
    initialPost: {
      type: Object,
      default: () => ({ title: "", content: "" }),
    },
  },
  emits: ["postAdded"],

  setup(props, { emit }) {
    const emitMessage = ref("");
    const newPost = ref({
      title: props.initialPost.title,
      content: props.initialPost.content,
    });

    const posts = ref(JSON.parse(localStorage.getItem("posts")) || []);
    const selectedPost = ref(null);

    const addPost = () => {
      const database = getDatabase();
      const postsRef = dbRef(database, "posts"); // Assuming your posts are stored in a "posts" node

      // Create a new post object with the current date
      const newPostObject = {
        id: uuidv4(),
        title: newPost.value.title,
        content: newPost.value.content,
      };

      // Push the new post to Firebase
      push(postsRef, newPostObject);
    };

    const deletePost = (index) => {
      posts.value.splice(index, 1);
      saveToLocalStorage();
    };

    const editPost = (index) => {
      const updatedPost = prompt(
        "Edytuj post:",
        JSON.stringify(posts.value[index])
      );
      if (updatedPost !== null) {
        posts.value[index] = JSON.parse(updatedPost);
        saveToLocalStorage();
      }
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("posts", JSON.stringify(posts.value));
    };

    const postCount = computed(() => {
      return posts.value.length;
    });

    const showPostDetails = (index) => {
      selectedPost.value = posts.value[index];
    };

    const formatPostDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("pl-PL", options);
    };

    const groupedPosts = computed(() => {
      const postsGroupedByMonth = groupBy(posts.value, (post) =>
        new Date(post.date).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
        })
      );

      const sortedGroups = sortBy(
        Object.entries(postsGroupedByMonth),
        ([date]) => new Date(date)
      );

      const uniqueGroups = uniqBy(sortedGroups, ([date]) => date);

      return uniqueGroups;
    });

    return {
      newPost,
      posts,
      selectedPost,
      emitMessage, // Dodanie emitMessage do zwracanego obiektu
      addPost,
      deletePost,
      editPost,
      postCount,
      showPostDetails,
      formatPostDate,
    };
  },
};
</script>

<style scoped>
/* Dodaj opcjonalne style Bootstrapa lub inne style dodatkowe */
</style>
