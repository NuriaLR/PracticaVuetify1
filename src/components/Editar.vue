<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';

const route = useRoute();
const postId = ref(null);
const lista = ref({});

//  Función para obtener el ID del Post a editar
async function leerApi() {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}`);
  lista.value = response.data;
}
//  Se ejecuta cuando se carga la página
onBeforeMount(() => {
  postId.value = route.params.id;
  leerApi();
});
console.log(lista)

</script>

<template>
  <v-container>
    <h2>EDITAR {{ postId }}</h2>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="lista.title"
            label="TÍTULO"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="lista.body"
            label="TEXTO"
            rows="4"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn type="submit" color="success">MODIFICAR</v-btn>
      <v-btn type="submit" color="success">ELIMINAR</v-btn>
    </v-form>
  </v-container>
</template>

