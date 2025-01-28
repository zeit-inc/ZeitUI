import { useImageViewerState } from '../context/ImageViewerContext';

const ImageContainer = () => {
  const {
    src,
    containerRef,
    imageRef,
    handleImageLoad,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    position,
    scale,
    rotation,
    isDragging,
    isFullScreen,
  } = useImageViewerState();

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        ref={imageRef}
        src={src || '/placeholder.svg'}
        alt="Imagen para visualizar"
        className={`absolute left-1/2 top-1/2 select-none ${isFullScreen ? 'max-h-screen' : ''}`}
        style={{
          transform: `
            translate(-50%, -50%)
            translate(${position.x}px, ${position.y}px)
            scale(${scale})
            rotate(${rotation}deg)
          `,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onLoad={handleImageLoad}
        draggable="false"
      />
    </div>
  );
};

export default ImageContainer;
