import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    const currentUserLocationWeather = ref()
    const allUserLocationWeather = ref([])
    const API_key = 'bd5e378503939ddaee76f12ad7a97608'
    interface Weather {
        weather: [
            {
                id: number,
                main: string,
                description: string,
                icon: string
            }
        ],
        main: {
            temp: number,
            feels_like: number,
            pressure: number,
            humidity: number,
        },
        wind: {
            speed: number,
            deg: number,
        },
        country: string,
        name: string,
        visibility: number
     }


    return {currentUserLocationWeather, allUserLocationWeather, API_key}
},
{
    persist: true,
})