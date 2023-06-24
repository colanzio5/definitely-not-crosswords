<template>
    <div class="app-border text-lg flex flex-row">
        <div :class="downStyle" @click="filterDown">
            DOWN
        </div>
        <div class="w-full" />
        <div :class="acrossStyle" @click="filterAcross">ACROSS</div>
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