<script lang="ts">
import ActiveUserToolbar from '@/components/toolbars/ActiveUserToolbar.vue';
import { vxm } from '@/store';
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {
    ActiveUserToolbar,
  },
})
export default class UserProfile extends Vue {
  get vxm() {
    return vxm;
  }
}
</script>

<template>
  <div class="w-full h-full app-view-port flex flex-col">
    <img src="@assets/img/orb__103x103.apng" alt="" srcset="" height="128" width="128">
    <div class="app-view-port text-white">
      uid: {{  vxm.user.activeUser?.uid }}
    </div>
    <div class="app-view-port text-white">
      display name: {{  vxm.user.activeUser?.displayName }}
    </div>
    <div class="app-view-port text-white">
      full name: {{  vxm.user.activeUser?.firstName }} {{  vxm.user.activeUser?.lastName }}
    </div>
    <div class="app-view-port text-white">
      email: {{  vxm.user.activeUser?.email }}
    </div>
  </div>
</template>
