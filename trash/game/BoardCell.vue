<script lang="ts">
import { vxm } from '@/store';
import { Cell } from '@/utils/game/cell';
import { Question } from '@/utils/game/question';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class BoardCell extends Vue {
  @Prop({ required: true }) cell!: Cell;

  get isSelected(): boolean {
    const selectedQuestions = vxm.activeGame.selectedQuestions;
    if (selectedQuestions.length == 0) return false;
    return selectedQuestions.some((q) =>
      Question.containsCoordinates(q, this.cell.coordinates)
    )
  }

  get viewState(): string {
    const cellState = this.cell.currentState;
    return cellState == "NOT_DEFINED"
      ? ""
      : cellState;
  }

  get isLetter(): boolean {
    return this.cell.correctState !== 'NOT_DEFINED';
  }


  get cellClass(): string {
    if (!this.isLetter) return 'box empty';
    else {
      if (!this.isSelected) return 'box letter';
      else return 'box letter selected-letter';
    }
  }


  async selectCell(cell: Cell) {
    await vxm.activeGame.selectCoordinates({
      coordinates: cell.coordinates,
    });
  }

  next(e: KeyboardEvent) {
    e.preventDefault();
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      e.target?.parentElement?.nextSibling?.firstChild?.focus();
    }
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      e.target?.parentElement?.nextSibling?.firstChild?.focus();
    }
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
