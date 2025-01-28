import { Button } from '@heroui/button';
import { RotateCcw, RotateCw } from '@zeitui-org/icons';

interface RotateControlProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

export const RotateControl = ({ onRotateLeft, onRotateRight }: RotateControlProps) => {
  return (
    <div className="flex gap-2">
      <Button
        isIconOnly
        size="sm"
        aria-labelledby="rotate-image"
        color="primary"
        radius="md"
        onPress={onRotateLeft}
      >
        <RotateCcw />
      </Button>
      <span id="rotate-image" className="text-sm sr-only">
        Rotar
      </span>
      <Button
        isIconOnly
        size="sm"
        aria-labelledby="rotate-image"
        color="primary"
        radius="md"
        onPress={onRotateRight}
      >
        <RotateCw />
      </Button>
    </div>
  );
};
