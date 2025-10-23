<template>
  <div id="app">
    <h1>🚀 Usuarios App</h1>
    <UsuarioList :usuarios="usuarios" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import UsuarioList from './components/Usuario.vue';

interface Usuario {
  id: number;
  usuario: string;
  password: string;
}

export default defineComponent({
  name: 'App',
  components: { UsuarioList },
  data() {
    return {
      usuarios: [] as Usuario[],
    };
  },
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    async cargarUsuarios() {
      try {
        const res = await axios.get<Usuario[]>('http://localhost:3000/Usuario');
        this.usuarios = res.data;
      } catch (err) {
        console.error('❌ Error cargando usuarios:', err);
      }
    },
  },
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
  border-radius: 0.9%;
  background: linear-gradient(135deg, #cedfec, #ffffff);
  font-family: 'Segoe UI', Roboto, Helvetica, sans-serif;
  color: #000000;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 5px solid #0099ff;
  padding-bottom: 8px;
}

@media (max-width: 600px) {
  h1 { font-size: 1.5rem; text-align: center; }
  #app { padding: 20px 10px; }
}
</style>
