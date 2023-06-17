<script lang="ts">
import { vxm } from "@/store";
import { Vue } from "vue-class-component";

export default class ActionsList extends Vue {
  get vxm() { return vxm }
}
</script>

<template>
  <div class="app-view-port h-min flex-grow overflow-y-scroll">
    <div
      v-for="action in vxm.activeGame.actions"
      :key="action.id"
      class="text-xs app-view-port flex flex-row p-2"
    >
      <div class="text-primary-500 mr-2">{{ action.actionType }}</div>
      <div class="text-white mr-2">by:</div>
      <div class="text-compliment-200 mr-2">
        {{ action.submittedById ?? 'unknown' }}
      </div>
      <div class="text-primary-500 mr-2">at:</div>
      <div class="text-white mr-2">
        {{ action.submittedAt.toDate().toDateString() }}
      </div>
      <div class="text-primary-500 mr-2">state:</div>
      <div class="text-white mr-2">{{ action.state }}</div>
      <div class="text-primary-500 mr-2">previous state:</div>
      <div class="text-white mr-2">{{ action.previousState }}</div>
      <div class="text-primary-500 mr-2">coordinates:</div>
      <div class="text-white mr-2">
        { {{ action.coordinates.x }}, {{ action.coordinates.y }} }
      </div>
    </div>
  </div>
</template>
