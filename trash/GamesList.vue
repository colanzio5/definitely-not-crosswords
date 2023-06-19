<script lang="ts">
import { vxm } from '@/store';
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';
import ActiveUserToolbar from '@/components/toolbars/ActiveUserToolbar.vue';

@Options({
  components: {
    ActiveUserToolbar,
  },
})
export default class GamesList extends Vue {
  router = useRouter();

  get vxm() {
    return vxm;
  }

  async created() {
    await vxm.gamesList.load();
  }

  async beginUnstartedGame(gameTemplateId: string) {
    const { id } = await vxm.gamesList.createGameFromTemplate({
      gameTemplateId,
    });
    await this.router.push({ name: 'game', params: { gameId: id } });
  }

  async openInProgressGame(activeGameId: string) {
    await this.router.push({ name: 'game', params: { gameId: activeGameId } });
  }
}
</script>

<template>
  <div class="app-view-port flex flex-col">
    <div v-if="vxm.gamesList.isLoaded" class="w-full h-full flex-grow">
      <!-- not started -->
      <div class="app-view-port text-white">
        games not started:
        <div v-if="vxm.gamesList.gameTemplates.length">
          <div class="underline text-white">start new game</div>
          <div v-for="gameTemplate in vxm.gamesList.gameTemplates" :key="gameTemplate.id"
            class="text-white border border-white hover:link w-full p-2" @click="beginUnstartedGame(gameTemplate.id)">
            <div class="link">{{ gameTemplate.id }}</div>
          </div>
        </div>
        <div v-else="text - white">none</div>
      </div>

      <!-- in progress -->
      <div class="app-view-port text-white">
        games in progress:
        <div v-if="vxm.gamesList.activeGames.length">
          <div class="underline text-white">continue playing</div>
          <div v-for="liveGame in vxm.gamesList.activeGames" :key="liveGame.id"
            class="text-white border border-white hover:link w-full p-2 flex"
            @click="openInProgressGame(liveGame.id)">
            <div class="flex-col m-2">{{ liveGame.id }}</div>
            <div class="flex-col m-2">created by: </div>
            <div class="flex-col m-2">{{ liveGame.ownerId }}</div>
          </div>
        </div>
        <div v-else="text - white">none</div>
      </div>
      <!-- complete -->
      <div class="app-view-port text-white">
        completed games:
        <div v-if="vxm.gamesList.completedGames.length">
          <div class="underline text-white">completed games</div>
          <div v-for="gameTemplate in vxm.gamesList.activeGames" :key="gameTemplate.id"
            class="text-white border border-white hover:link w-full p-2">
            <div>{{ gameTemplate.id }}</div>
          </div>
        </div>
        <div v-else="text - white">none</div>
      </div>
    </div>

    <div v-else class="app-view-port">
      <div class="loading-bar"></div>
    </div>
  </div>
</template>
