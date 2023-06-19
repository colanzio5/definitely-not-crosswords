<script setup lang="ts">
import { type IBoardState} from "~/lib/types/interfaces/IBoardState"

const props = defineProps<{boardState:IBoardState}>()
</script>

<template>
  <div class="flex-col">
    <div
      v-for="(cellRow, rowIndex) of props.boardState" :key="rowIndex"
      class="flex flex-row justify-center"
    >
      <div v-for="cell of cellRow" :key="cell.coordinates.x">
        <BoardCell :cell="cell" />
      </div>
    </div>
  </div>
</template>
