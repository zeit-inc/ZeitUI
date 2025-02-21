import { Button } from '@heroui/button';
import { RestartAlt } from '@zeitui-org/icons';
import type { ControlStyleProps } from '../../types';

type ResetControlProps = {
  handleReset: () => void;
} & ControlStyleProps;

export const ResetControl = ({ handleReset, ...controlStyles }: ResetControlProps) => {
  return (
    <Button aria-label='Resetear' isIconOnly onPress={handleReset} {...controlStyles}>
      <RestartAlt />
    </Button>
  );
};
