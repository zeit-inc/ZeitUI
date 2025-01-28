import { Button } from '@heroui/button';
import { RestartAlt } from '@zeitui-org/icons';
import { ControlStyleProps } from '../../types';

type ResetControlProps = {
  handleReset: () => void;
} & ControlStyleProps;

export const ResetControl = ({ handleReset, ...controlStyles }: ResetControlProps) => {
  return (
    <Button aria-labelledby="reset-label" isIconOnly onPress={handleReset} {...controlStyles}>
      <RestartAlt />
    </Button>
  );
};
