<template>
  <div>
    <AppHeader />
    <LoadingBar v-if="pending"/>
    <div v-else class="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
      <GameBoard class="flex-shrink" />
      <QuestionsList class="h-full w-full flex-grow" />
      <!-- <QuestionsList class="overflow-y-scroll" :direction="'ACROSS'" /> -->
      <!-- <GameActionsList class=""/> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $client } = useNuxtApp()

const { data: activeGame, pending } = await $client.getActiveGameById.useQuery({ id: route.params.id });

</script>
