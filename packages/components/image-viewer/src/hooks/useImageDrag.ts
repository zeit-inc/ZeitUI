import { useCallback, useState } from 'react';
import type { Position } from '../types';

interface UseImageDragProps {
  scale: number;
  imageDimensions: { width: number; height: number };
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useImageDrag = ({ scale, imageDimensions, containerRef }: UseImageDragProps) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const calculateBoundaries = useCallback(
    (clientX: number, clientY: number): Position => {
      if (!containerRef.current) return { x: 0, y: 0 };

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
    [dragStart.x, dragStart.y, imageDimensions.height, imageDimensions.width, scale, containerRef],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPosition = calculateBoundaries(e.clientX, e.clientY);
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    position,
    setPosition,
    isDragging,
    dragStart,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    calculateBoundaries,
  };
};
