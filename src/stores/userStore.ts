import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    const currentUserLocationWeather = ref()
    const allUserLocationWeather = ref([])
    const API_key = 'bd5e378503939ddaee76f12ad7a97608'

    return {currentUserLocationWeather, allUserLocationWeather, API_key}
},
{
    persist: true,
})