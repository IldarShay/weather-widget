<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { Weather } from '@/types';
import draggable from 'vuedraggable'
const userStore = useUserStore()

const deleteLocation = (location:Weather) => {
    const index = userStore.allUserLocationWeather.findIndex(el => el.id === location.id)
    userStore.allUserLocationWeather.splice(index, 1)
}
</script>
<template >
<div class="main">
    <TransitionGroup name="list" tag="div">
        <draggable  
            v-model="userStore.allUserLocationWeather" 
            tag = "div" 
            group = "location"
            item-key="id"
        >
            <template #item="{element}" :key="element.id">
                <div class="location" :key="element.id">
                    <div class="location-burger">
                        <img src="../assets/icons/burger.svg" />
                    </div>
                    <p>{{ `${element.name}, ${element.sys.country}` }}</p>
                    <div class="location-delete" @click="deleteLocation(element)">
                        <img src="../assets/icons/delete.svg"/>
                    </div>
                </div>
            </template>
        </draggable>
            </TransitionGroup>
</div>
</template>


<style lang="scss" scoped>
  .main{
    .location{
        padding: 10px 5px;
        margin: 10px 0 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        
        p{
            margin:0 10px;
            font-weight: 500
        }
        .location-delete{
            margin-left: auto;
        }
        img{
            width: 25px;
        }
        img:hover {
            cursor: pointer;
        }
        img:active {
            transform: scale(0.9);
            transition: all 0.2s ease;
        }
    }
  }

</style>
