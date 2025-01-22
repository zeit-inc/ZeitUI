import { Minus, Plus } from "@zeitui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALLOWED_SCALES, DEFAULT_SCALE_IMAGE } from "../config/Scale";
import { ImageViewerProps, Position } from "../types";

const ImageViewer = ({ src }: ImageViewerProps) => {
  const [scale, setScale] = useState(DEFAULT_SCALE_IMAGE);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const calculateBoundaries = useCallback(
    (clientX: number, clientY: number): Position => {
      if (!containerRef.current || !imageRef.current) return { x: 0, y: 0 };

      const container = containerRef.current.getBoundingClientRect();
      const scaledImageWidth = imageDimensions.width * scale;
      const scaledImageHeight = imageDimensions.height * scale;

      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;

      const boundaryX = Math.max(0, (scaledImageWidth - container.width) / 2);
      const boundaryY = Math.max(0, (scaledImageHeight - container.height) / 2);

      return {
        x: Math.min(Math.max(newX, -boundaryX), boundaryX),
        y: Math.min(Math.max(newY, -boundaryY), boundaryY),
      };
    },
    [dragStart.x, dragStart.y, imageDimensions.height, imageDimensions.width, scale]
  );

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: { preventDefault: () => void; clientX: number; clientY: number }) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (isDragging) {
      const newPosition = calculateBoundaries(e.clientX, e.clientY);
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const changeScale = (direction: "up" | "down") => {
    const currentMatchIndex = ALLOWED_SCALES.findIndex((s) => s === scale);

    if (currentMatchIndex === -1) return;

    const nextIndex = direction === "up" ? currentMatchIndex + 1 : currentMatchIndex - 1;
    if (nextIndex >= 0 && nextIndex < ALLOWED_SCALES.length) {
      setScale(ALLOWED_SCALES[nextIndex]);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e: { preventDefault: () => void; deltaY: number }) => {
      e.preventDefault();
      changeScale(e.deltaY < 0 ? "up" : "down");

      if (container) {
        const newPosition = calculateBoundaries(dragStart.x + position.x, dragStart.y + position.y);
        setPosition(newPosition);
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel);
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [dragStart.x, dragStart.y, position.x, position.y, calculateBoundaries]);

  const handleRotate = (direction: string) => {
    setRotation((prev) => (prev + (direction === "right" ? 90 : -90)) % 360);
    setPosition({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setScale(DEFAULT_SCALE_IMAGE);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden border border-red-200 rounded-lg">
      <div
        ref={containerRef}
        className="absolute w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Imagen para visualizar"
          className="absolute left-1/2 top-1/2 select-none"
          style={{
            transform: `
              translate(-50%, -50%)
              translate(${position.x}px, ${position.y}px)
              scale(${scale})
              rotate(${rotation}deg)
            `,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
          onLoad={handleImageLoad}
          draggable="false"
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 p-2 rounded-lg shadow">
        <button
          onClick={() => changeScale("up")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={scale === ALLOWED_SCALES[ALLOWED_SCALES.length - 1]}
        >
          <Plus />
        </button>
        <button
          onClick={() => changeScale("down")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={scale === ALLOWED_SCALES[0]}
        >
          <Minus />
        </button>
        <div className="px-2 py-1 bg-gray-100 rounded">{(scale * 100).toFixed(0)}%</div>
        <button
          onClick={() => handleRotate("left")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ↺
        </button>
        <button
          onClick={() => handleRotate("right")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ↻
        </button>
        <button onClick={handleReset} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
