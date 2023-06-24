<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useActiveGameStore } from '~/stores/activeGame';


const { actions } = storeToRefs(useActiveGameStore());

</script>
<template>
  <div class="app-view-port h-min flex-grow overflow-y-scroll">
    <div
      v-for="action in actions"
      :key="action.id"
      class="text-xs app-view-port flex flex-row p-2"
    >
      <div class="text-primary-500 mr-2">{{ action.actionType }}</div>
      <div class="text-white mr-2">by:</div>
      <div class="text-compliment-200 mr-2">
        {{ action.userId ?? 'unknown' }}
      </div>
      <div class="text-primary-500 mr-2">at:</div>
      <div class="text-white mr-2">
        {{ new Date(action.submittedAt).toDateString() }}
      </div>
      <div class="text-primary-500 mr-2">state:</div>
      <div class="text-white mr-2">{{ action.state }}</div>
      <div class="text-primary-500 mr-2">previous state:</div>
      <div class="text-white mr-2">{{ action.previousState }}</div>
      <div class="text-primary-500 mr-2">coordinates:</div>
      <div class="text-white mr-2">
        { {{ action.cordX }}, {{ action.cordY }} }
      </div>
    </div>
  </div>
</template>
