import { Button } from '@heroui/button';
import { downloadFile } from '@zeitui-org/file-utils';
import { Download } from '@zeitui-org/icons';
import { Size } from '../../types';

type DownloadControlProps = {
  url: string;
  size?: Size;
};

export const DownloadControl = ({ url, size }: DownloadControlProps) => {
  const handleDownload = async () => {
    await downloadFile(url);
  };

  return (
    <Button
      isIconOnly
      size={size}
      aria-labelledby="rotate-image"
      color="primary"
      radius="md"
      onPress={handleDownload}
    >
      <Download />
    </Button>
  );
};
