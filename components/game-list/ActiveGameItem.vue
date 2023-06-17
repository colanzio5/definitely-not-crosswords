<template>
  <div @click="navigateTo(`game/${props.game.id}`)">
    <h1>name: {{ props.game.id }}</h1>
    <div class="flex-grow"></div>
    <n-button type="warning"> active </n-button>
  </div>
</template>

<script setup lang="ts">
import { ActiveGame } from "@prisma/client";

const props = defineProps<{
  game: ActiveGame;
}>();
</script>
