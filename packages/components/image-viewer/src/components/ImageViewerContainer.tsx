import { ImageViewerContainerProps } from "../types";
import ImageViewer from "./ImageViewer";

const ImageViewerContainer = ({ src }: ImageViewerContainerProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="w-full bg-gray-200 rounded-lg shadow-2xl h-[calc(100vh-64px)] max-h-[1600px]">
        <div className="h-full flex flex-col overflow-hidden">
          {/* Fila de controles - altura fija */}
          <div className="flex-none w-full p-2">s</div>

          {/* Área de contenido - altura flexible */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Barra lateral estrecha */}
            <aside className="flex-none w-10 bg-gray-200">
              <div className="w-full h-full flex flex-col items-center p-1">
                <button className="h-7 w-7 p-1 bg-inherit rounded-md hover:enabled:bg-gray-300">s</button>
              </div>
            </aside>

            {/* Contenedor del canvas */}
            <div className="flex-1 relative overflow-hidden">
              <ImageViewer src={src} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerContainer;
