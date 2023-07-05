import { Ref, computed, ref } from "vue";
import { DIR, IImages, ROTATE, ZOOM } from "./types";

export function useSliderLeft (sliderIndex: Ref) {
  const sliderLeft = computed(() => sliderIndex.value * 440);
  return sliderLeft;
}

export function useSliderIndex (imgLen: number) {
  const sliderIndex = ref(0);

  const setSliderIndex = (dir: DIR) => {
    const index = sliderIndex.value;

    switch (dir) {
      case DIR.FOR:
        sliderIndex.value = index >= imgLen - 1 ? 0 : index + 1;
        break;
      case DIR.BACK:
        sliderIndex.value = index === 0 ? imgLen - 1 : index - 1;
        break;
      default:
        break;
    } 
  }

  return {
    sliderIndex, 
    setSliderIndex
  };
}

export function useImageData (images: IImages[]) {
  const imageData = ref(images);

  const setImageRotate = (sliderIndex: number, dir: ROTATE) => {
    const rotate = imageData.value[sliderIndex].rotate;

    switch (dir) {
      case ROTATE.LEFT:
        imageData.value[sliderIndex].rotate = rotate - 10;
        break;
      case ROTATE.RIGHT:
        imageData.value[sliderIndex].rotate = rotate + 10;
        break;
      default:
        break;
    }
  }

  const setImageScale = (sliderIndex: number, zoom: ZOOM) => {
    const scale = imageData.value[sliderIndex].scale;

    switch (zoom) {
      case ZOOM.IN:
        scale < 3 && (imageData.value[sliderIndex].scale += .1);
        break;
      case ZOOM.OUT:
        scale > .2 && (imageData.value[sliderIndex].scale -= .1);
        break;
      default:
        break;
    }
  }

  return {
    imageData,
    setImageRotate,
    setImageScale
  }
}