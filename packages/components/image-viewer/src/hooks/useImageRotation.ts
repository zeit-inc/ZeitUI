import {useState} from 'react';

export const useImageRotation = () => {
  const [rotation, setRotation] = useState(0);

  const rotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const resetRotation = () => {
    setRotation(0);
  };

  return {rotation, setRotation, rotateLeft, rotateRight, resetRotation};
};
