import { useEffect, useRef, useState } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = async () => {
    if (!viewerRef.current) return;

    try {
      if (!isFullScreen) {
        if (viewerRef.current.requestFullscreen) {
          await viewerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return { isFullScreen, toggleFullScreen, viewerRef };
};
