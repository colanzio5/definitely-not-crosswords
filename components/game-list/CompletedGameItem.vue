<template>
    <div @click="navigateTo(`game/completed/${props.game.id}`)">
        <h1>name: {{ props.game.id }}</h1>
        <div class="flex-grow"></div>
        <n-button type="info">completed</n-button>
    </div>
</template>
  
<script setup lang="ts">
import { CompletedGame } from "@prisma/client";

const props = defineProps<{
    game: CompletedGame
}>();

</script>
  