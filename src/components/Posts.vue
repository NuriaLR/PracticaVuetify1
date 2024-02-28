<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';
import EditarVue from './Editar.vue';

const router = useRouter();
const lista = ref([]);
const favoritos = ref([]);
const mostrarFavoritos = ref(false);

async function leerApi() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  lista.value = response.data;
  console.log(lista.value)
  
}

function irFavoritos() {
  mostrarFavoritos.value = true;
}

function irEditar(id) {
  router.push(`/editar/${id}`);
}

function agregarFavorito(post) {
  if (!favoritos.value.find((fav) => fav.id === post.id)) {
    favoritos.value.push(post);
  }
}

function quitarFavorito(post) {
  favoritos.value = favoritos.value.filter((fav) => fav.id !== post.id);
}

onBeforeMount(leerApi);
</script>

<template>
  <div class="container">
    <div class="row mt-4" v-if="!mostrarFavoritos">
      <div class="col">
        <button @click="irFavoritos" class="btn btn-success">FAVORITOS</button>
      </div>
    </div>
    <v-row>
      <v-col v-if="!mostrarFavoritos" v-for="post in lista" :key="post.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="mb-4" outlined>
          <v-card-title>{{ post.id }}. {{ post.title }}</v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
          <v-card-actions>
            <v-btn @click="irEditar(post.id)" color="green">EDITAR</v-btn>
            <v-btn type="button" class="btn btn-outline-danger" @click="agregarFavorito(post)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
</svg>
                
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="mostrarFavoritos" class="mt-4">
      <v-col>
        <v-btn @click="mostrarFavoritos = false" color="success">Ver Posts</v-btn>
      </v-col>
    </v-row>
    <v-col v-if="mostrarFavoritos">
      <h3>Mis Favoritos</h3>
      <v-card v-for="fav in favoritos" :key="fav.id" class="mb-2" outlined>
        <v-card-title>{{ fav.id }}. {{ fav.title }}</v-card-title>
        <v-card-text>{{ fav.body }}</v-card-text>
        <v-card-actions>
          <v-btn @click="quitarFavorito(fav)" color="success">QUITAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div> 
</template>
