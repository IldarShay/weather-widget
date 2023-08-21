<script setup lang="ts">
import {ref} from 'vue'
import {useUserStore} from '../stores/userStore'
const userStore = useUserStore()
const URL = ref('')

const temperature = temp => Math.trunc(temp - 273.15)
const kilometres = km => (km/1000).toFixed(1)
const descriptionWeather = description => description.charAt(0).toUpperCase() + description.slice(1, -1)

navigator.geolocation.getCurrentPosition((position) => {
  URL.value = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${userStore.API_key}`
  if (!userStore.currentUserLocationWeather) getCurrentUserLocationWeather()
}, error => console.log(error),
{
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000,
})

const getCurrentUserLocationWeather = async() => {
    const response = await fetch(URL.value)
    const data = await response.json()
    userStore.currentUserLocationWeather = data
    userStore.allUserLocationWeather.push(data)
}
</script>
<template>
    <div class="cards" v-for="card,i of userStore.allUserLocationWeather">
      <div class="card-header">
        <p>{{ `${card.name}, ${card.sys.country}` }}</p>
        <RouterLink to="/edit">
          <img v-if="i === 0" src="../assets/icons/settings.svg" class="card-header-settings"/>
        </RouterLink>
      </div>
      <div class="card-main">
        <div class="card-main-img">
          <img :src="`https://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`"/>
          <h1>{{ temperature(card.main.temp) + '°C' }}</h1>
        </div>
        <div class="card-main-feels">
          <p>{{ `Feels like ${temperature(card.main.feels_like)}°C. ${card.weather[0].main}. ${descriptionWeather(card.weather[0].description)}` }}</p>
        </div>
        <div class="card-main-info">
          <div class="card-main-info-item">
            <img src="../assets//icons/arrow.svg" />
            <p>{{ `${card.wind.speed}m/s ${card.wind.deg}°` }}</p>
          </div>
          <div class="card-main-info-item">
            <img src="../assets/icons/compass.svg"/>
            <p>{{ `${card.main.pressure}hPa` }}</p>
          </div>
          <div class="card-main-info-item">
            <p>{{ `Humidity: ${card.main.humidity}%` }}</p>
          </div>
          <div class="card-main-info-item">
            <p>{{ `Visibility: ${kilometres(card.visibility)}km` }}</p>
          </div>
        </div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
.cards {
  width: 280px;
  height: fit-content;
  margin: 0 0 75px 0 ;
  display: flex;
  flex-direction: column;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      margin: 0 ;
      font-weight: 700;
    }
  }
  .card-main{
    display: flex;
    flex-direction: column;
    font-weight: 500;
    .card-main-img {
      display: flex;
      justify-content:center;
      align-items: center;
      margin: 10px 0 
    }
    .card-main-info{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .card-main-info-item{
        width: 50%;
        padding: 5px  0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        p {
          margin: 0 5px;
          
        }
        img {
          width: 20px
        }
      }
    }
  }
}
.card-header-settings:hover {
  cursor: pointer
}
.card-header-settings:active {
  transform: rotate(360deg);
  transition: all 0.4s ease;
}
</style>
