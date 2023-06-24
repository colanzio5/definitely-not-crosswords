<template>
  <div>
    <div class="app-border mt-1 p-1 w-min">
      <img :src="image" alt="" srcset="">
      <h1>name: {{ name }}</h1>
      <h1>email: {{ email }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~~/stores/user'

definePageMeta({
  middleware: 'auth'
})

const { $client } = useNuxtApp()
const userStore = useUserStore()
const { image, name, email } = storeToRefs(userStore)

</script>
