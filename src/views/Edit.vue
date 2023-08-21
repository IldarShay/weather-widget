<script setup lang="ts">
import InputSearchWeather from '@/components/InputSearchWeather.vue';
import LocationWeather from '@/components/LocationWeather.vue'
import HeaderSettings from '@/components/HeaderSettings.vue'
</script>

<template >
    <div class="container" >
        <HeaderSettings/>
        <LocationWeather/>
        <InputSearchWeather/>
    </div>
</template>


<style lang="scss" scoped>
.container{
  width: 280px;
  height: fit-content;
  margin: 0 ;
  padding: 0;
}
</style>
