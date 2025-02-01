import { Button } from '@heroui/button';
import { downloadFile } from '@zeitui-org/file-utils';
import { Download } from '@zeitui-org/icons';
import type { ControlStyleProps } from '../../types';

type DownloadControlProps = {
  url: string;
} & ControlStyleProps;

export const DownloadControl = ({ url, ...controlStyles }: DownloadControlProps) => {
  const handleDownload = () => {
    downloadFile({ url, extensionDefault: '.png' });
  };

  return (
    <Button isIconOnly aria-labelledby='rotate-image' onPress={handleDownload} {...controlStyles}>
      <Download />
    </Button>
  );
};
