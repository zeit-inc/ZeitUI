import { Maximize, Minimize } from '@zeitui-org/icons';

const ExitFulllScren = 'Salir del modo de pantalla completa';
const EnterFullScreen = 'Entrar en modo de pantalla completa';

type FullScreenControlProps = {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
};

export const FullScreenControl = ({ isFullScreen, toggleFullScreen }: FullScreenControlProps) => {
  return (
    <button
      onClick={toggleFullScreen}
      aria-label={isFullScreen ? ExitFulllScren : EnterFullScreen}
      title={isFullScreen ? ExitFulllScren : EnterFullScreen}
      className="p-2 text-gray-900 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
    >
      {isFullScreen ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
    </button>
  );
};
