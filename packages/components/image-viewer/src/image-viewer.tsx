import { ImageViewerContent } from './components/ImageViewerContent';
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
      <ImageViewerContent controlStyle={controlStyle} />
    </ImageViewerProvider>
  );
};

ImageViewer.displayName = 'ZeitUI.ImageViewer';

export default ImageViewer;
