<template>
    <div class="flex flex-row">
        <button :class="downStyle" @click="filterDown">down</button>
        <div class="w-full" />
        <button :class="acrossStyle" @click="filterAcross">across</button>
    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useActiveGameStore } from '~/stores/activeGame';


const activeGameStore = useActiveGameStore();
const { filterDown, filterAcross } = activeGameStore;
const { selectedDirection: direction } = storeToRefs(activeGameStore);


const acrossStyle = computed(() => direction.value === 'ACROSS'
    ? 'button rainbow-text-animated app-border bg-compliment-200'
    : 'button text-white app-border link')

const downStyle = computed(() => direction.value === 'DOWN'
    ? 'button rainbow-text-animated app-border bg-compliment-200'
    : 'button text-white app-border link')
</script>

<style scoped>
.button {
    @apply text-sm;
}
</style>