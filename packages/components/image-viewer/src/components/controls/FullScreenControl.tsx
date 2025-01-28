import { Button } from '@heroui/button';
import { Maximize, Minimize } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

const ExitFulllScren = 'Salir del modo de pantalla completa';
const EnterFullScreen = 'Entrar en modo de pantalla completa';

type FullScreenControlProps = {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
} & ControlStyleProps;

export const FullScreenControl = ({
  isFullScreen,
  toggleFullScreen,
  ...constrolStyles
}: FullScreenControlProps) => {
  return (
    <Button
      onPress={toggleFullScreen}
      isIconOnly
      aria-label={isFullScreen ? ExitFulllScren : EnterFullScreen}
      title={isFullScreen ? ExitFulllScren : EnterFullScreen}
      {...constrolStyles}
    >
      {isFullScreen ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
    </Button>
  );
};
