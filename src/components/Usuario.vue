<template>
  <div class="container">
    <h1>🎉 Usuarios Divertidos</h1>

    <!-- Formulario de registro -->
    <div class="card form-card">
      <h2>📝 Registrar Usuario</h2>
      <form @submit.prevent="registrarUsuario" class="form">
        <input v-model="usuarioNuevo.usuario" placeholder="Usuario" required />
        <input v-model="usuarioNuevo.password" placeholder="Password" type="password" required />
        <button type="submit">✨ Registrar</button>
      </form>
    </div>

    <!-- Lista de usuarios -->
    <div class="user-list">
      <h2>📋 Lista de Usuarios</h2>
      <div v-if="usuarios.length" class="cards">
        <div class="card user-card" v-for="u in usuarios" :key="u.id">
          <p><strong>ID:</strong> {{ u.id }}</p>
          <p><strong>Usuario:</strong> {{ u.usuario }}</p>
          <p><strong>Password:</strong> {{ u.password }}</p>
        </div>
      </div>
      <p v-else class="no-users">🤔 No hay usuarios registrados aún.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import axios from 'axios';

interface Usuario {
  id: number;
  usuario: string;
  password: string;
}

export default defineComponent({
  name: 'UsuarioList',
  props: {
    usuarios: {
      type: Array as PropType<Usuario[]>,
      required: true
    }
  },
  data() {
    return {
      usuarioNuevo: { usuario: '', password: '' } as Omit<Usuario, 'id'>
    };
  },
  methods: {
    async registrarUsuario() {
      try {
        const respuesta = await axios.post<Usuario>('http://localhost:3000/Usuario', this.usuarioNuevo);
        this.$emit('usuario-registrado', respuesta.data);
        this.usuarioNuevo = { usuario: '', password: '' };
        alert('✅ Usuario registrado con éxito');
      } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        alert('❌ Ocurrió un error al registrar el usuario.');
      }
    }
  }
});
</script>

<style scoped>
/* Fondo general */
.container {
  max-width: 900px;
  margin: 40px auto;
  font-family: 'Comic Sans MS', 'Segoe UI', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #ffdde1, #fceabb);
  padding: 20px;
  border-radius: 15px;
}

/* Título principal */
h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ff4500;
  text-shadow: 2px 2px #fff;
}

/* Cards generales */
.card {
  background-color: #fff7d6;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  margin-bottom: 25px;
  transition: transform 0.2s, background-color 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  background-color: #fffae0;
}

/* Formulario */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form input {
  padding: 10px 12px;
  border: 2px dashed #ff69b4;
  border-radius: 12px;
  font-size: 15px;
  background-color: #fff0f5;
  transition: transform 0.2s, border-color 0.3s;
}
.form input:focus {
  outline: none;
  border-color: #ff1493;
  transform: scale(1.03);
}
.form button {
  padding: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #ff69b4;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.form button:hover {
  background-color: #ff1493;
  transform: scale(1.05) rotate(-2deg);
}

/* Lista de usuarios estilo cards */
.user-list h2 {
  margin-bottom: 15px;
  color: #ff6347;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
}
.user-card {
  background: linear-gradient(135deg, #ffd1dc, #ffefba);
  border: 2px dashed #ff69b4;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s;
}
.user-card:hover {
  transform: scale(1.05) rotate(1deg);
}
.user-card strong {
  color: #ff1493;
}
.no-users {
  font-style: italic;
  color: #ff4500;
  text-align: center;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 2rem;
  }
}
</style>
