import { Button } from '@heroui/button';
import { printFile } from '@zeitui-org/file-utils';
import { Printer } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

type PrintControlProps = {
  url: string;
} & ControlStyleProps;

export const PrintControl = ({ url, ...controlStyles }: PrintControlProps) => {
  const handlePrint = () => {
    printFile(url);
  };

  return (
    <Button
      onPress={handlePrint}
      aria-label="Print image"
      title="Print image"
      isIconOnly
      {...controlStyles}
    >
      <Printer aria-hidden="true" />
    </Button>
  );
};
