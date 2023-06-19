<script setup lang="ts">
import { CCell, CQuestion } from "~/lib/game"

const props = defineProps<{
  cell: CCell
}>();

const isSelected = computed((): boolean => {
  const selectedQuestions = activeGame.selectedQuestions;
  if (selectedQuestions.length == 0) return false;
  return selectedQuestions.some((q) =>
    CQuestion.containsCoordinates(q, props.cell.coordinates)
  )
})

const viewState = computed((): string => {
  const cellState = props.cell.currentState;
  return cellState == "NOT_DEFINED"
    ? ""
    : cellState;
})

const isLetter = computed((): boolean => {
  return props.cell.correctState !== 'NOT_DEFINED';
})


const cellClass = computed((): string => {
  if (!isLetter) return 'box empty';
  else {
    if (!isSelected) return 'box letter';
    else return 'box letter selected-letter';
  }
})


async function selectCell(cell: Cell) {
  await activeGame.selectCoordinates({
    coordinates: cell.coordinates,
  });
})

function next(e: KeyboardEvent) {
  e.preventDefault();
  if (e.keyCode >= 48 && e.keyCode <= 57) {
    e.target?.parentElement?.nextSibling?.firstChild?.focus();
  }
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    e.target?.parentElement?.nextSibling?.firstChild?.focus();
  }
}
</script>

<template>
  <div v-if="!isLetter" class="box empty"></div>
  <div v-else>
    <input v-if="isSelected" class="box letter selected" :value="viewState" type="text" maxlength="1" @keyup="next" />
    <div v-else @click="selectCell(cell)" class="box letter"></div>
  </div>
</template>


<style>
.box {
  @apply w-6 h-6 border text-center;
}

.empty {
  @apply bg-black;
}

.letter {
  @apply bg-white border-black;
}

.letter::hover {
  @apply border border-secondary-500;
}

.selected {
  @apply bg-highlight-300;
}
</style>
