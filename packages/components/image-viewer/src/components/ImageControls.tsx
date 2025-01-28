import { useImageViewerState } from '../context/ImageViewerContext';
import { useControlStyles } from '../hooks/useControlStyles';
import { ControlStyleProps } from '../types';
import { DownloadControl } from './controls/DowloadControl';
import { FullScreenControl } from './controls/FullScreenControl';
import { PrintControl } from './controls/PrintControl';
import { ResetControl } from './controls/ResetControl';
import { RotateControl } from './controls/RotateControl';
import { ZoomControls } from './controls/ZoomControl';

type ImageControlsProps = {
  styles?: ControlStyleProps;
};

const ImageControls = ({ styles }: ImageControlsProps) => {
  const {
    src,
    scale,
    incrementScale,
    decrementScale,
    rotateLeft,
    rotateRight,
    toggleFullScreen,
    isFullScreen,
    handleReset,
    isMaxScale,
    isMinScale,
  } = useImageViewerState();

  const controlStyles = useControlStyles(styles || {});

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
      <ZoomControls
        scale={scale}
        zoomIn={incrementScale}
        zoomOut={decrementScale}
        isMaxScale={isMaxScale}
        isMinScale={isMinScale}
        {...controlStyles}
      />
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <RotateControl onRotateLeft={rotateLeft} onRotateRight={rotateRight} {...controlStyles} />
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <DownloadControl url={src} {...controlStyles} />
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <ResetControl handleReset={handleReset} {...controlStyles} />
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <FullScreenControl
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
        {...controlStyles}
      />
      <div className="w-px h-6 bg-gray-300 mx-2" />
      <PrintControl url={src} {...controlStyles} />
    </div>
  );
};

ImageControls.displayName = 'ImageControls';

export default ImageControls;
