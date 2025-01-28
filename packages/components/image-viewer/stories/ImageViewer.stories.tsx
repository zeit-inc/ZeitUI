import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from '../src';

const meta = {
  title: 'Components/ImageViewer',
  component: ImageViewer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  args: {
    src: 'https://placehold.co/1280x720?text=Default+Image',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen a mostrar',
      type: { name: 'string', required: true },
    },
    controlVariant: {
      control: 'select',
      description: 'Estilo de los controles',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
      type: { name: 'string' },
    },
    controlColor: {
      control: 'select',
      description: 'Color de los controles',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      type: { name: 'string' },
    },
    controlSize: {
      control: 'select',
      description: 'Tamaño de los controles',
      options: ['sm', 'md', 'lg'],
      type: { name: 'string' },
    },
    controlRadius: {
      control: 'select',
      description: 'Radio de los controles',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      type: { name: 'string' },
    },
    controlIsDisabled: {
      control: 'boolean',
      description: 'Indica si los controles están deshabilitados',
      type: { name: 'boolean' },
    },
  },
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof ImageViewer>;

// Story principal
export const Default: Story = {
  args: {
    src: 'https://placehold.co/1280x720?text=Default+Image',
  },
};

// Story con imagen vertical
export const VerticalImage: Story = {
  args: {
    src: 'https://placehold.co/720x1280?text=Vertical+Image',
  },
};

// Story con imagen muy grande
export const LargeImage: Story = {
  args: {
    src: 'https://placehold.co/2000x1500?text=Large+Image',
  },
};

// Story con imagen pequeña
export const SmallImage: Story = {
  args: {
    src: 'https://placehold.co/150x150?text=Small+Image',
  },
};

// Story que muestra cómo se comporta con un error de carga
export const ErrorImage: Story = {
  args: {
    src: 'https://placehold.co/invalid',
  },
};
