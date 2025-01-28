import { Button } from '@heroui/button';
import { ZoomIn, ZoomOut } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

type ZoomControlsProps = {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  isMaxScale: boolean;
  isMinScale: boolean;
} & ControlStyleProps;

export const ZoomControls = ({
  scale,
  zoomIn,
  zoomOut,
  isMaxScale,
  isMinScale,
  ...controlStyles
}: ZoomControlsProps) => {
  const scalePorcentage = scale * 100 + '%';

  // Ajusta el tamaño del texto según la propiedad `size` de `controlStyles`:
  // - 'sm' -> 'text-sm'
  // - 'md' -> 'text-base'
  // - 'lg' -> 'text-lg'
  const sizeText =
    controlStyles.size === 'sm' ? 'text-sm' : controlStyles.size === 'md' ? 'text-base' : 'text-lg';

  return (
    <div className="flex items-center">
      <Button
        aria-labelledby="zoom-in-label"
        isIconOnly
        onPress={zoomIn}
        isDisabled={isMaxScale}
        {...controlStyles}
      >
        <ZoomIn />
      </Button>
      <span id="zoom-in-label" className="sr-only">
        Incrementar zoom
      </span>

      <span className={`w-16 text-center ${sizeText}`}>{scalePorcentage}</span>

      <Button
        aria-labelledby="zoom-out-label"
        isIconOnly
        onPress={zoomOut}
        isDisabled={isMinScale}
        {...controlStyles}
      >
        <ZoomOut />
      </Button>
      <span id="zoom-out-label" className="sr-only">
        Reducir zoom
      </span>
    </div>
  );
};
