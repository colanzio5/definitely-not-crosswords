import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const { data } = useAuth()
  const { $client } = useNuxtApp();
  
  const isLoaded = ref(false);

  const name = computed(() => data.value?.user?.name)
  const email = computed(() => data.value?.user?.email)
  const image = computed(() => data.value?.user?.image)


  async function load() {

  }

  return { name, email, image }
})
