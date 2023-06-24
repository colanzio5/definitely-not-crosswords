<template>
  <div class="flex flex-row">
    <button class="app-button link" @click="navigateTo('/')">home</button>
    <button class="app-button link" @click="navigateTo('/games')">games</button>
    <div class="flex-grow"></div>
    <button class="app-button link" @click="signOut()">sign out</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { signOut } = useAuth();
</script>
