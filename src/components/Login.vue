<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';

const router = useRouter();  // Desestructurar el hook useRouter

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const lista = ref([]);
const errorLogin = ref(false);


async function leerApi() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    lista.value = response.data;
}

//  Funcion para enviar los datos del formulario a la api
function inicioSesion(event) {
    if (event.ctrlKey && event.altKey && event.key === 'Enter') {
        console.log('Ctrl+Alt+Enter presionado');
        //  Ejecutamos la funcion de inicio de sesión
        click();
    }
}

function click() {
    //   Resetear mensaje de error si hubiera uno anteriormente
    const email = userEmail.value;
    const name = userName.value;

    // Verificar si el email y nombre y apellido se encuentra en la lista de usuarios
    const usuarioEncontrado = lista.value.some(user => user.email === email);
    const usuarioNombre = lista.value.some(user => user.name === name);

    if (usuarioEncontrado && usuarioNombre) {
        console.log('CORRECTO');
        errorLogin.value = false;
        router.push('/posts');  
    } else {
        errorLogin.value = true;
    }
    leerApi();
}

onBeforeMount(leerApi);
</script>

<template>
  <div @keydown="inicioSesion">
    <form>
      <div class="form-group">
        <label for="name">Nombre y Apellido</label>
        <input
          type="name"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Tu nombre y apellido"
          v-model="userName"
        >
        <small id="nameHelp" class="form-text text-muted">
        </small>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Tu email"
          v-model="userEmail"
        >
        <small id="emailHelp" class="form-text text-muted">
        </small>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Tu contraseña" v-model="userPassword">
      </div>

      <div v-show="errorLogin" class="alert alert-danger" role="alert">
        Credenciales incorrectas. Por favor, inténtalo de nuevo.
      </div>

      <button type="button" @click="click" class="btn btn-warning">Login</button>
    </form>
  </div>
</template>

