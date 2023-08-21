<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import {ref} from 'vue'
const userStore = useUserStore()
const newCity = ref()
const disabledInput = ref(false)
const inputField = ref()
const addLocation = async (city:string)=> {
    newCity.value=''
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${userStore.API_key}`)
    const coords = await response.json()
    if (coords[0]) {
        searchWeather(coords[0].lon, coords[0].lat)
    } else {
        warningDisabled()
    }

}
const searchWeather = async (lon:number, lat:number) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${userStore.API_key}`
    const response = await fetch(URL)
    const data = await response.json()
    const repeatLocation = userStore.allUserLocationWeather.find(el => el.id === data.id)
    if (repeatLocation) return false
    userStore.allUserLocationWeather.push(data)
    
}
const warningDisabled = () => {
    disabledInput.value = true
  setTimeout(() => {
    disabledInput.value = false
  }, 2000)
}
</script>
<template >
        <div class="footer">
            <div class="footer-description"><p>Add Location:</p></div>
            <div class="footer-input" :class="{shake: disabledInput}">
                <input class="form-control" type="text" id="input-city" v-model.trim="newCity" ref="inputField"/>
                <button class="btn" @click="addLocation(newCity)">
                    <img src="../assets/icons/arrow-left.svg"/>
                </button>
                <span v-if="disabledInput" class="footer-warning">Такого города не существует !</span>
            </div>
        </div>
</template>


<style lang="scss" scoped>
  .footer{
    .footer-description{
        p{
            font-weight: 700;
        }
    }
    .footer-input{
        display: flex;
        flex-wrap: wrap;
        input{
            width: 79%;
            border-radius: 3px;
            font-weight: 500;
        }
        input:focus{
            box-shadow: none;
            border: 2px solid rgb(0, 179, 255)
        }
    }
    .footer-warning {
        padding: 5px 0;
        font-weight: 700;
        color: red
    }
  }
  .shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
