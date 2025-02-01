import type { ControlStyleProps } from '../types';

export const useControlStyles = (props: ControlStyleProps) => {
  return {
    variant: props.variant ?? 'solid',
    color: props.color ?? 'primary',
    size: props.size ?? 'md',
    radius: props.radius ?? 'md',
  };
};
