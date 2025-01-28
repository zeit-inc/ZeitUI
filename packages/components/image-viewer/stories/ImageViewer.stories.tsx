import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from '../src';

const meta = {
  title: 'Components/ImageViewer',
  component: ImageViewer,
  parameters: {
    layout: 'fullscreen', // Ya que tu componente usa altura completa
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  // Definimos los argumentos por defecto
  args: {
    src: 'https://placehold.co/1280x720?text=Default+Image', // Placeholder por defecto
  },
  // Definimos los controles para los props
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen a mostrar',
      type: { name: 'string', required: true },
    },
  },
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof ImageViewer>;

// Story principal
export const Default: Story = {
  args: {
    src: 'https://historialplus.aa6b07d4f6a02d2f9c053b24b15c5c07.r2.cloudflarestorage.com/image0.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250127T040107Z&X-Amz-SignedHeaders=host&X-Amz-Credential=b56e8ac1d1b75702ae5a677fe7d98ce7%2F20250127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Expires=14400&X-Amz-Signature=4c29a2000d10bc6a2ef7903bb9b6e14a8768865e0be0fcd6048c4fef22a30cad', // Imagen horizontal por defecto
  },
};

// Story con imagen vertical
export const VerticalImage: Story = {
  args: {
    src: 'https://placehold.co/720x1280?text=Vertical+Image', // Imagen vertical
  },
};

// Story con imagen muy grande
export const LargeImage: Story = {
  args: {
    src: 'https://placehold.co/2000x1500?text=Large+Image', // Imagen grande
  },
};

// Story con imagen pequeña
export const SmallImage: Story = {
  args: {
    src: 'https://placehold.co/150x150?text=Small+Image', // Imagen pequeña
  },
};

// Story que muestra cómo se comporta con un error de carga
export const ErrorImage: Story = {
  args: {
    src: 'https://placehold.co/invalid', // Imagen de error con fondo rojo
  },
};
