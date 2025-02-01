import { useImageViewerState } from '../context/ImageViewerContext';
import type { ControlStyleProps } from '../types';
import ImageControls from './ImageControls';
import ImageContainer from './image';

type ImageViewerContentProps = {
  controlStyle?: ControlStyleProps;
};

export const ImageViewerContent = ({ controlStyle }: ImageViewerContentProps) => {
  const { viewerRef, isFullScreen } = useImageViewerState();

  return (
    <div
      ref={viewerRef}
      className={`relative ${
        isFullScreen
          ? 'fixed inset-0 z-50 bg-gray-100'
          : 'w-full max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg'
      }`}
    >
      <div
        className={`${isFullScreen ? 'h-screen' : 'h-[calc(100vh-64px)] max-h-[1600px]'} relative`}
      >
        <div className='h-full w-full flex flex-col overflow-hidden'>
          <ImageContainer />
          <ImageControls styles={controlStyle} />
        </div>
      </div>
    </div>
  );
};
