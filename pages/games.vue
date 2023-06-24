<template>
  <div class="app-border flex flex-col">
    <div class="w-full h-full flex-grow">
      <!-- 
      <div class="app-border text-white flex flex-row">
          todo: filters/searchbar  
          <button class="app-button color-primary-500"> unstarted </button>
          <button class="app-button color-secondary-500"> completed </button>
          <button class="app-button color-highlight-500"> active </button> 
        <div class="flex-grow"></div>
        <div class="app-border w-content">
          <span>search: </span><input class="text-white bg-black" type="text" v-model="searchTerm" />
        </div>
      </div>
      -->
      
      <LoadingBar v-if="pending" />
      <div v-else v-for="game in games" :game="game" :gameType="game.type"
        class="app-border text-white hover:link w-full">

        <div v-if="game.type === 'Game'" @click="navigateTo(`game/${game.id}/new`)" class="flex flex-row">
          <h1>name: {{ game.title }}</h1>
          <div class="flex-grow"></div>
          <n-button type="primary">unstarted</n-button>
        </div>

        <div v-if="game.type === 'ActiveGame'" @click="navigateTo(`game/${game.id}`)" class="flex flex-row">
          <h1>name: {{ game.game.title }}</h1>
          <div class="flex-grow"></div>
          <n-button type="warning"> active </n-button>
        </div>

        <div v-if="game.type === 'CompletedGame'" @click="navigateTo(`game/${game.id}/completed`)" class="flex flex-row">
          <h1>name: {{ game.game.title }}</h1>
          <div class="flex-grow"></div>
          <n-button type="info">completed</n-button>
        </div>

      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const runtimeConfig = useRuntimeConfig();
const searchTerm = "";

const { data: user } = useAuth();
const { $client } = useNuxtApp();

const { data: games, pending } = await $client.gameList.get.useQuery({
  email: user.value?.user?.email as string,
});
</script>
