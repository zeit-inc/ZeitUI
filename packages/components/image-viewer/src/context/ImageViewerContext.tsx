import { createContext, useContext, useRef } from 'react';
import { useFullScreen } from '../hooks/useFullScreen';
import { useImageDimensions } from '../hooks/useImageDimensions';
import { useImageDrag } from '../hooks/useImageDrag';
import { useImageRotation } from '../hooks/useImageRotation';
import { useImageScale } from '../hooks/useImageScale';

interface ImageViewerState {
  src: string;
  imageRef: React.RefObject<HTMLImageElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  scale: number;
  rotation: number;
  position: { x: number; y: number };
  isFullScreen: boolean;
  isDragging: boolean;
  imageDimensions: { width: number; height: number };
  isMaxScale: boolean;
  isMinScale: boolean;
  resetScale: () => void;
  incrementScale: () => void;
  decrementScale: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  resetRotation: () => void;
  toggleFullScreen: () => void;
  viewerRef: React.RefObject<HTMLDivElement>;
  setPosition: (position: { x: number; y: number }) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  handleReset: () => void;
}

const ImageViewerContext = createContext<ImageViewerState | null>(null);

export const useImageViewerState = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error('useImageViewerState debe usarse dentro de un ImageViewerProvider');
  }
  return context;
};

export const ImageViewerProvider = ({
  children,
  src,
}: {
  children: React.ReactNode;
  src: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageDimensions, imageRef, handleImageLoad } = useImageDimensions();
  const { scale, resetScale, incrementScale, decrementScale, isMaxScale, isMinScale } =
    useImageScale();
  const { rotation, rotateLeft, rotateRight, resetRotation } = useImageRotation();
  const { isFullScreen, toggleFullScreen, viewerRef } = useFullScreen();
  const { position, setPosition, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } =
    useImageDrag({
      scale,
      imageDimensions,
      containerRef,
    });

  const handleReset = () => {
    resetScale();
    resetRotation();
    setPosition({ x: 0, y: 0 });
  };

  const value = {
    src,
    imageRef,
    containerRef,
    scale,
    rotation,
    position,
    isFullScreen,
    isDragging,
    imageDimensions,
    resetScale,
    isMaxScale,
    isMinScale,
    incrementScale,
    decrementScale,
    rotateLeft,
    rotateRight,
    resetRotation,
    toggleFullScreen,
    viewerRef,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleImageLoad,
    handleReset,
  };

  return <ImageViewerContext.Provider value={value}>{children}</ImageViewerContext.Provider>;
};
