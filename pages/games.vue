<template>
  <div>
    <AppHeader />
    <div class="app-border flex flex-col">
      <div class="w-full h-full flex-grow">
        <div class="app-border text-white flex flex-row">
          <n-space>
            <n-button type="primary"> unstarted </n-button>
            <n-button type="info"> completed </n-button>
            <n-button type="warning"> active </n-button>
          </n-space>
          <div class="flex-grow"></div>
          <div class="app-border w-min">
            <span>search: </span
            ><input
              class="text-white bg-black"
              type="text"
              v-model="searchTerm"
            />
          </div>
        </div>
        <div
          v-if="gamesPending || activeGamesPending || completedGamesPending"
          class="app-border"
        >
          <div class="loading-bar"></div>
        </div>
        <GameListItem
          v-for="game in games"
          :game="game"
          :gameType="game.type"
          class="text-white hover:link w-full p-2"
        />
      </div>
    </div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ActiveGame, CompletedGame, Game } from "@prisma/client";

definePageMeta({
  middleware: "auth",
});
const runtimeConfig = useRuntimeConfig();
const searchTerm = ""
const userId = "cliz6kfw70000vf4g4rekdy3m";

const { data } = useAuth();

type ExplicitGame = Game & { type: "Game" };
const { data: _games, pending: gamesPending } = await useFetch<ExplicitGame[]>(
  `${runtimeConfig.public.nuxtPublicBaseApiUrl}/game`,
  {
    transform: (res: ExplicitGame[]) => {
      return res.map((g) => {
        g.type = "Game";
        return g;
      });
    },
  }
);

type ExplicitActiveGame = ActiveGame & { type: "ActiveGame" };
const { data: _activeGames, pending: activeGamesPending } = await useFetch<
  ExplicitActiveGame[]
>(`${runtimeConfig.public.nuxtPublicBaseApiUrl}/activeGame?userId=${userId}`, {
  transform: (res: ExplicitActiveGame[]) => {
    console.dir(res);
    return res.map((g) => {
      g.type = "ActiveGame";
      return g;
    });
  },
});

type ExplicitCompletedGame = CompletedGame & { type: "CompletedGame" };
const { data: _completedGames, pending: completedGamesPending } =
  await useFetch<ExplicitCompletedGame[]>(
    `${runtimeConfig.public.nuxtPublicBaseApiUrl}/completedGame?userId=${userId}`,
    {
      transform: (res: ExplicitCompletedGame[]) => {
        return res.map((g) => {
          g.type = "CompletedGame";
          return g;
        });
      },
    }
  );

const games = computed(() => {
  if (!_games.value || !_activeGames.value || !_completedGames.value) return [];
  else
    return [..._games.value, ..._activeGames.value, ..._completedGames.value].filter(game => game.type.includes(searchTerm));
});
</script>
