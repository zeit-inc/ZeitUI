import {useState} from 'react';
import {ALLOWED_SCALES, DEFAULT_SCALE_IMAGE} from '../config/Scale';

export const useImageScale = () => {
  const [scale, setScale] = useState(DEFAULT_SCALE_IMAGE);

  const currentIndex = ALLOWED_SCALES.findIndex((s) => s === scale);

  const incrementScale = () => {
    if (currentIndex < ALLOWED_SCALES.length - 1) {
      setScale(ALLOWED_SCALES[currentIndex + 1]);
    }
  };

  const decrementScale = () => {
    if (currentIndex > 0) {
      setScale(ALLOWED_SCALES[currentIndex - 1]);
    }
  };

  const resetScale = () => {
    setScale(DEFAULT_SCALE_IMAGE);
  };

  return {
    scale,
    resetScale,
    incrementScale,
    decrementScale,
    isMaxScale: currentIndex === ALLOWED_SCALES.length - 1,
    isMinScale: currentIndex === 0,
  };
};
