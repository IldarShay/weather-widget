<script setup lang="ts">
import { useUserStore} from '@/stores/userStore';
const userStore = useUserStore()

</script>
<template>
    <div class="added-weather" v-if="!userStore.allUserLocationWeather[0]">
      <span >Добавить прогноз погоды</span>
      <RouterLink to="/edit">
        <img class="card-header-settings" src="../assets/icons/settings.svg"  />
      </RouterLink>
    </div>
</template>


<style lang="scss" scoped>

.added-weather{
  width: 280px;
  display: flex;
  justify-content: space-between;
}
.card-header-settings:hover {
  cursor: pointer
}
.card-header-settings:active {
  transform: rotate(360deg);
  transition: all 0.4s ease;
}
</style>
