<script lang="ts">
import ActiveUserToolbar from "@/components/toolbars/ActiveUserToolbar.vue";
import { vxm } from '@/store';
import GameActionsList from "@/views/game/ActionsList.vue";
import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router';
import GameBoard from './GameBoard.vue';
import QuestionsList from './QuestionsList.vue';

@Options({
  components: {
    GameActionsList,
    ActiveUserToolbar,
    GameBoard,
    QuestionsList,
  },
})
export default class GameWrapper extends Vue {
  route = useRoute();

  get vxm() {
    return vxm;
  }

  get activeGameId(): string {
    return this.$route.params.id as string;
  }

  async mounted(): Promise<void> {
    await vxm.activeGame.load({
      gameId: this.route.params.gameId.toString()
    });
  }

  async beforeUnmount(): Promise<void> {
    await vxm.activeGame.unload();
  }
}
</script>

<template>
  <div v-if="vxm.activeGame.isLoaded" class="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
    <GameBoard class="flex-shrink"/>
    <QuestionsList class="h-full w-full flex-grow"/>
    <!-- <QuestionsList class="overflow-y-scroll" :direction="'ACROSS'" /> -->
    <!-- <GameActionsList class=""/> -->
  </div>
</template>

<style lang="postcss">
.s-full {
  @apply top-0 bottom-0 left-0 right-0;
}
</style>
