<script setup>
import { ref, onMounted, computed } from 'vue';

const usuarios = ref([]);
const nuevoUsuario = ref({
  usuario: '',
  password: ''
});
const errorGet = ref(null);
const errorPost = ref(null);
const mensajePost = ref('');
const filtroTexto = ref('');

const API_URL = 'http://localhost:3000/Usuario';

const usuariosFiltrados = computed(() => {
  const filtro = filtroTexto.value.toLowerCase().trim();
  if (!filtro) {
    return usuarios.value;
  }
  
  return usuarios.value.filter(user => {
    const id = String(user.id);
    const usuario = user.usuario.toLowerCase();
    
    return id.includes(filtro) || usuario.includes(filtro);
  });
});

const obtenerUsuarios = async () => {
  errorGet.value = null; 
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    usuarios.value = data;
  } catch (error) {
    errorGet.value = error.message;
  }
};

const crearUsuario = async () => {
  mensajePost.value = '';
  errorPost.value = null;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario.value)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Error al crear usuario: ${response.statusText}`);
    }
    
    mensajePost.value = `✅ Creado: ${data.usuario} (ID: ${data.id})`;
    
    nuevoUsuario.value = { usuario: '', password: '' };
    await obtenerUsuarios(); 
    
  } catch (error) {
    errorPost.value = error.message;
  }
};

onMounted(() => {
  obtenerUsuarios();
});
</script>

<template>
  <main class="api-container">
    
    <h1 class="main-title">Vista para agregar/ver la API :D</h1>

    <section class="section-card">
      <h2 class="section-title">✨ Registrar Nuevo Usuario </h2>
      
      <form @submit.prevent="crearUsuario" class="user-form">
        <input type="text" placeholder="Nombre de usuario" v-model="nuevoUsuario.usuario" required>
        <input type="password" placeholder="Contraseña" v-model="nuevoUsuario.password" required>
        
        <button type="submit" class="primary-btn">Añadir Usuario</button>
      </form>
      
      <p v-if="errorPost" class="error-msg">❌ Error: {{ errorPost }}</p>
      <p v-if="mensajePost" class="success-msg">{{ mensajePost }}</p>
    </section>

    <section class="section-card">
      <h2 class="section-title">📋 Lista de Usuarios </h2>
      
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Buscar por ID o Usuario..." 
          v-model="filtroTexto" 
          class="search-input"
        >
      </div>
      
      <p v-if="errorGet" class="error-msg error-connection">
        ❌ Error de conexión: {{ errorGet }}
      </p>

      <p v-else-if="usuarios.length === 0" class="loading-msg">Cargando o no hay usuarios registrados...</p>
      <p v-else-if="usuariosFiltrados.length === 0 && filtroTexto" class="loading-msg">No se encontraron resultados para "{{ filtroTexto }}"</p>

      <ul v-else class="user-list">
        <li v-for="user in usuariosFiltrados" :key="user.id">
          <span class="user-id">ID: {{ user.id }}</span> | Usuario: {{ user.usuario }}
        </li>
      </ul>
      
      <button @click="obtenerUsuarios" class="refresh-btn">Recargar Lista</button>
    </section>

  </main>
</template>

<style scoped>
:root {
  --color-light-bg: #f9f7f6;
  --color-card-bg: #ffffff;
  --color-accent-main: #b86d4e;
  --color-accent-secondary: #f0c38e;
  --color-text-dark: #333333;
  --color-border-soft: #e0e0e0;
  --color-success: #5cb85c;
  --color-error: #d9534f;
  --color-item-bg: #f5f5f5;
  --color-black: #000000;
  --color-white: #ffffff;
}

:global(body) {
  background-color: var(--color-light-bg) !important;
  color: var(--color-text-dark);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

.main-title {
    text-align: center;
    color: var(--color-accent-main);
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 40px;
    letter-spacing: 2px;
}

.api-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-card {
  padding: 30px;
  border-radius: 12px;
  background-color: var(--color-card-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-border-soft);
}

.section-title {
  color: var(--color-accent-main);
  border-bottom: 1px solid var(--color-border-soft);
  padding-bottom: 10px;
  margin-top: 0;
  font-size: 1.4rem;
  font-weight: 500;
}

.user-form input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid var(--color-border-soft);
  border-radius: 6px;
  background-color: var(--color-item-bg);
  color: var(--color-text-dark);
  transition: border-color 0.3s;
}

.user-form input:focus {
    border-color: var(--color-accent-main);
    outline: none;
    box-shadow: 0 0 0 3px rgba(184, 109, 78, 0.1);
}

.primary-btn, .refresh-btn {
  background-color: var(--color-accent-main);
  color: var(--color-card-bg);
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  /* Animación Ajustada */
  transition: background-color 0.4s, color 0.4s, transform 0.1s; 
  margin-top: 10px;
}

.primary-btn:hover, .refresh-btn:hover {
  background-color: var(--color-black); 
  color: var(--color-white);           
  transform: translateY(-1px);
}

.search-container {
    margin-bottom: 20px;
}
.search-input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--color-border-soft);
    border-radius: 6px;
    background-color: var(--color-item-bg);
    color: var(--color-text-dark);
}
.search-input:focus {
    border-color: var(--color-accent-main);
    outline: none;
    box-shadow: 0 0 0 3px rgba(184, 109, 78, 0.1);
}

.user-list {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

.user-list li {
  background-color: var(--color-item-bg); 
  margin-bottom: 8px;
  padding: 15px;
  border-left: 4px solid var(--color-accent-secondary); 
  border-radius: 8px;
  color: var(--color-text-dark);
  transition: background-color 0.3s;
}

.user-list li:hover {
    background-color: #f0ecea;
}

.user-id {
    font-weight: 600;
    color: var(--color-accent-main);
}

.error-msg {
  color: var(--color-error);
  font-weight: 500;
  margin-top: 15px;
}

.success-msg {
  color: var(--color-success);
  font-weight: 500;
  margin-top: 15px;
}
</style>