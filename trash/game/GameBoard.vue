<script lang="ts">
import { vxm } from '@/store';
import { IBoardState, ICoordinates } from '@/utils/game/boardState';
import { Options, Vue } from 'vue-class-component';
import BoardCell from "./BoardCell.vue"

@Options({
  inheritAttrs: false,
  components: {
    BoardCell
  }
})
export default class GameBoard extends Vue {

  get vxm() {
    return vxm;
  }

  get boardSize(): ICoordinates {
    const { x, y } = vxm.activeGame.boardSize;
    return { x, y };
  }

  get boardState(): IBoardState {
    return vxm.activeGame.boardState;
  }
}
</script>

<template>
  <div class="flex-col">
    <div
      v-for="(cellRow, rowIndex) of boardState" :key="rowIndex"
      class="flex flex-row justify-center"
    >
      <div v-for="cell of cellRow" :key="cell.coordinates.x">
        <BoardCell :cell="cell" />
      </div>
    </div>
  </div>
</template>
