<template>
  <div class="image-container">
    <img :src="require(`../../assets/images/${image}`)" :style="{
      transform: `rotate(${rotate}deg) scale(${scale})`
    }" draggable="false" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  image: string,
  scale: number,
  rotate: number
}>()
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  float: left;
  width: 440px;
  height: 248px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .3s;
  }
}
</style>