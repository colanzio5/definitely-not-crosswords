<template>
  <div class="app-border text-white hover:link w-full p-2">
    <GameItem v-if="props.gameType == 'Game'"  :game="game as Game" />
    <ActiveGameItem v-if="props.gameType == 'ActiveGame'"  :game="game as ActiveGame" />
    <CompletedGameItem v-if="props.gameType == 'CompletedGame'" :game="game as CompletedGame" />
  </div>
</template>

<script setup lang="ts">
import { ActiveGame, CompletedGame, Game } from "@prisma/client";
import ActiveGameItem from "./ActiveGameItem.vue";
import GameItem from "./GameItem.vue";
import CompletedGameItem from "./CompletedGameItem.vue";

const props = defineProps<{
  game: Game | ActiveGame | CompletedGame;
  gameType: "Game" | "ActiveGame" | "CompletedGame";
}>();
</script>
