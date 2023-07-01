<script setup lang="ts">
import { Question } from "@prisma/client";
import { storeToRefs } from "pinia";
import { useActiveGameStore } from "~/stores/activeGame";
import { onClickOutside } from '@vueuse/core'
import { OnClickOutside } from '@vueuse/components'

const activeGameStore = useActiveGameStore();
const { submitActions, selectQuestion, unSelect } = activeGameStore;
const { selectedQuestion, filteredQuestions, gameActionData } = storeToRefs(activeGameStore);


function isSelected(question: Question): boolean {
  if (!selectedQuestion?.value) return false;
  return selectedQuestion.value.id === question.id;
}

function keyup(e: KeyboardEvent) {
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
  <div class="flex flex-col">
    <div class="flex-grow">
      <div v-for="question in filteredQuestions" :key="question.id" :ref="question.id" @click="selectQuestion(question)">
        <div class="flex flex-row  border border-white">
          <div class="max-w-min p-1 border border-primary-500 text-white">
            {{ question.number }}
          </div>
          <div class="flex flex-col w-full">
            <div class="flex-grow text-white">
              {{ question.questionText }}
            </div>
            <div v-if="isSelected(question)" class="flex flex-row">
              <OnClickOutside @trigger="unSelect">
                <input v-for="modification of gameActionData" :class="'box letter selected'" v-model="modification.state"
                  type="text" maxlength="1" @keyup="keyup" />
                <div class="w-full"></div>
                <button class="app-button text-sm link" @click="submitActions('guess', question)">
                  guess
                </button>
              </OnClickOutside>
            </div>
            <div v-else class="flex flex-row">
              <div v-for="cell in question.answerMap"  @click="selectQuestion(question)">
                <div v-if="!cell.modifications?.length" class="box letter bg-white">{{ "" }}</div>
                <div v-else-if="cell.modifications[0].actionType === 'placeholder'" class="box letter bg-highlight-400">{{ cell?.modifications[0].state }}</div>
                <div v-else-if="cell.modifications[0].actionType === 'incorrectGuess'" class="box letter bg-secondary-400">{{ cell?.modifications[0].state }}</div>
                <div v-else-if="cell.modifications[0].actionType === 'correctGuess'" class="box letter bg-green-400">{{ cell?.modifications[0].state }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.correct { 
  @apply bg-green-200;
}
.box {
  @apply w-6 h-6 border text-center text-black;
}

.empty {
  @apply bg-black;
}

.letter {
  @apply border-black;
}

.letter:hover {
  @apply border border-secondary-500;
}

.selected {
  @apply bg-highlight-300;
}
</style>
