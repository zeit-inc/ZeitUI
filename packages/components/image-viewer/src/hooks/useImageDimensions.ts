import {useRef, useState} from 'react';

export const useImageDimensions = () => {
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  return {imageDimensions, imageRef, handleImageLoad};
};
