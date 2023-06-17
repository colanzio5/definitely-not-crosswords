<template>
  <div @click="navigateTo(`game/new/${props.game.id}`)">
    <h1>name: {{ props.game.id }}</h1>
    <div class="flex-grow"></div>
    <n-button type="primary">unstarted</n-button>
  </div>
</template>

<script setup lang="ts">
import { Game } from "@prisma/client";

const props = defineProps<{
  game: Game;
}>();
</script>
