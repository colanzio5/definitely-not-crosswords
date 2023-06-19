<template>
  <div>
    <AppHeader />
    <div v-if="user?.user" class="app-border mt-1 p-1 w-min">
      <img :src="user?.user?.image" alt="" srcset="">
      <h1>name: {{ user?.user?.name }}</h1>
      <h1>email: {{ user?.user?.email }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';

definePageMeta({ 
  middleware: 'auth',
})

const { data: user } = useAuth()
</script>
