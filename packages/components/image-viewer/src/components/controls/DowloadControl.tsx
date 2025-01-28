import { Button } from '@heroui/button';
import { downloadFile } from '@zeitui-org/file-utils';
import { Download } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

type DownloadControlProps = {
  url: string;
} & ControlStyleProps;

export const DownloadControl = ({ url, ...controlStyles }: DownloadControlProps) => {
  const handleDownload = async () => {
    await downloadFile({ url });
  };

  return (
    <Button isIconOnly aria-labelledby="rotate-image" onPress={handleDownload} {...controlStyles}>
      <Download />
    </Button>
  );
};
