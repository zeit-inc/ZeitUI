import ImageContainer from './components/image';
import ImageControls from './components/ImageControls';
import { ImageViewerProvider } from './context/ImageViewerContext';
import { ImageViewerProps } from './types';

const ImageViewer = (props: ImageViewerProps) => {
  const { src } = props;

  const controlStyle = {
    variant: props.controlVariant,
    color: props.controlColor,
    size: props.controlSize,
    radius: props.controlRadius,
  };

  return (
    <ImageViewerProvider src={src}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="w-full bg-gray-100 rounded-lg shadow-lg h-[calc(100vh-64px)] max-h-[1600px] relative">
          <div className="h-full flex flex-col overflow-hidden">
            <ImageContainer />
            <ImageControls styles={controlStyle} />
          </div>
        </div>
      </div>
    </ImageViewerProvider>
  );
};

ImageViewer.displayName = 'ZeitUI.ImageViewer';

export default ImageViewer;
