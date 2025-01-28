export type Size = 'sm' | 'md' | 'lg' | undefined;
export type Variant =
  | 'solid'
  | 'bordered'
  | 'light'
  | 'flat'
  | 'faded'
  | 'shadow'
  | 'ghost'
  | undefined;
export type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full' | undefined;

export interface ControlStyleProps {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  isDisabled?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
}

export interface ImageViewerProps {
  src: string;
  constrolStyle?: ControlStyleProps;
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

export interface Position {
  x: number;
  y: number;
}
