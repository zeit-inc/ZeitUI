import { Button } from '@heroui/button';
import { ZoomIn, ZoomOut } from '@zeitui-org/icons';

interface ZoomControlsProps {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  isMaxScale: boolean;
  isMinScale: boolean;
}

export const ZoomControls = ({
  scale,
  zoomIn,
  zoomOut,
  isMaxScale,
  isMinScale,
}: ZoomControlsProps) => {
  const scalePorcentage = scale * 100;

  return (
    <div className="flex items-center">
      <Button
        color="primary"
        size="sm"
        radius="md"
        aria-labelledby="zoom-in-label"
        isIconOnly
        onPress={zoomIn}
        isDisabled={isMaxScale}
      >
        <ZoomIn />
      </Button>
      <span id="zoom-in-label" className="sr-only">
        Incrementar zoom
      </span>

      <span className="w-16 text-center ">{scalePorcentage}%</span>

      <Button
        color="primary"
        size="sm"
        radius="md"
        aria-labelledby="zoom-out-label"
        isIconOnly
        onPress={zoomOut}
        isDisabled={isMinScale}
      >
        <ZoomOut />
      </Button>
      <span id="zoom-out-label" className="sr-only">
        Reducir zoom
      </span>
    </div>
  );
};
