import { Button } from '@heroui/button';
import { printFile } from '@zeitui-org/file-utils';
import { Printer } from '@zeitui-org/icons';

type PrintControlProps = {
  url: string;
};

export const PrintControl = ({ url }: PrintControlProps) => {
  const handlePrint = () => {
    printFile(url);
  };

  return (
    <Button
      onPress={handlePrint}
      aria-label="Print image"
      title="Print image"
      color="primary"
      isIconOnly
      size="md"
    >
      <Printer aria-hidden="true" />
    </Button>
  );
};
