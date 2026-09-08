import { Button } from '~/components/elements/button';
import { IconUpload } from '~/components/primitives/icons/upload';
import s from './control.module.scss';

interface ControlProps {
  id: string;
  isOpen: boolean;
  onToggle(): void;
}

export const Control = ({ id, isOpen, onToggle }: ControlProps) => {
  return (
    <Button
      className={s['button-import']}
      icon={IconUpload}
      size="large"
      variant="flat"
      tone="control"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onToggle}
    >
      Import
    </Button>
  );
};
