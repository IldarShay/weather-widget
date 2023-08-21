<script setup lang="ts">
</script>

<template >
    <div class="header">
        <p>Settings</p>
        <RouterLink to="/">
            <img src="../assets/icons/close.svg"/>
        </RouterLink>
    </div>
</template>


<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        margin: 0;
        font-weight: 700;
    }
    img{
        width:25px
    }
    img:active{
        transform: rotate(-0.45turn);
        transition: all 0.2s ease;
    }
  }
</style>
