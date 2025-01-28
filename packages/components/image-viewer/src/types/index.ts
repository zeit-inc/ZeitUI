export interface ImageViewerProps {
  src: string;
}

export interface ImageControlsProps {
  scale: number;
  isMaxScale: boolean;
  isMinScale: boolean;
  onScaleUp: () => void;
  onScaleDown: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
}

export type Size = 'sm' | 'md' | 'lg' | undefined;

export interface Position {
  x: number;
  y: number;
}
