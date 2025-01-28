import { Button } from '@heroui/button';
import { RotateCcw, RotateCw } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

type RotateControlProps = {
  onRotateLeft: () => void;
  onRotateRight: () => void;
} & ControlStyleProps;

export const RotateControl = ({
  onRotateLeft,
  onRotateRight,
  ...controlStyles
}: RotateControlProps) => {
  return (
    <div className="flex gap-2">
      <Button isIconOnly aria-labelledby="rotate-image" onPress={onRotateLeft} {...controlStyles}>
        <RotateCcw />
      </Button>
      <span id="rotate-image" className="text-sm sr-only">
        Rotar
      </span>
      <Button isIconOnly aria-labelledby="rotate-image" onPress={onRotateRight} {...controlStyles}>
        <RotateCw />
      </Button>
    </div>
  );
};
