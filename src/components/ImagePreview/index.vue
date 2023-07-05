<template>
  <div class="image-preview">
    <direction-icon :dir="DIR.BACK" @image-slide="imageSlide"></direction-icon>
    <direction-icon :dir="DIR.FOR" @image-slide="imageSlide"></direction-icon>
    <control-bar @image-rotate="imageRotate" @image-scale="imageScale"></control-bar>
    <div class="slider" :style="{
      width: preivewWidth + 'px',
      transform: `translate3d(-${sliderLeft}px, 0, 0)`
    }">
      <image-container v-for="item of imageData" :key="item.id" :image="item.image" :rotate="item.rotate"
        :scale="item.scale"></image-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageContainer from './ImageContainer.vue'
import DirectionIcon from './DirectionIcon.vue'
import ControlBar from './ControlBar.vue'
import { DIR, IImages, ROTATE, ZOOM } from './types'
import { useSliderIndex, useImageData, useSliderLeft } from './hook'

const props = defineProps<{
  images: IImages[]
}>()

const imgLen = props.images.length
const preivewWidth = imgLen * 440

const {
  sliderIndex,
  setSliderIndex
} = useSliderIndex(imgLen)

const sliderLeft = useSliderLeft(sliderIndex)

const {
  imageData,
  setImageRotate,
  setImageScale
} = useImageData(props.images)



const imageSlide = (dir: DIR): void => {
  imageReset(sliderIndex.value)
  setSliderIndex(dir)
}

const imageRotate = (dir: ROTATE): void => {
  setImageRotate(sliderIndex.value, dir)
}

const imageScale = (zoom: ZOOM): void => {
  setImageScale(sliderIndex.value, zoom)
}

const imageReset = (index: number) => {
  const target = imageData.value[index]

  target.rotate = 0
  target.scale = 1
}
</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;
  width: 440px;
  height: 248px;
  overflow: hidden;

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform .3s;
  }
}
</style>