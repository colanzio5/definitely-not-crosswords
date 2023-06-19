<script setup lang="ts">
const { data: user } = useAuth();
const { $client } = useNuxtApp()

const { data: activeGames } = await $client.activeGames.useQuery({ email: user.value?.user?.email });
</script>

<template>
  <div>
    <pre>{{ user }}</pre>
    ---
    <pre v-if="user?.user?.email">{{ activeGames }}</pre>
  </div>
</template>
