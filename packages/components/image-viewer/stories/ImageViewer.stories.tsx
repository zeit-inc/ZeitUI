import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent } from '@heroui/drawer';
import { useDisclosure } from '@heroui/use-disclosure';
import type { Meta, StoryObj } from '@storybook/react';

import { ImageViewer, type ImageViewerProps } from '../src';

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
    controlVariant: 'solid',
    controlColor: 'primary',
    controlSize: 'md',
    controlRadius: 'lg',
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
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    controlColor: {
      control: 'select',
      description: 'Color de los controles',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      table: {
        defaultValue: { summary: 'default' },
      },
      type: { name: 'string' },
    },
    controlSize: {
      control: 'select',
      description: 'Tamaño de los controles',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
      },
      type: { name: 'string' },
    },
    controlRadius: {
      control: 'select',
      description: 'Radio de los controles',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: {
        defaultValue: { summary: 'lg' },
      },
      type: { name: 'string' },
    },
  },
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof ImageViewer>;

const Template = (args: ImageViewerProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='flex items-center justify-center h-screen'>
      <Button onPress={onOpen}>Abrir Visor de imagenes</Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <DrawerContent>
          <DrawerBody className='p-8'>
            <ImageViewer {...args} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

// Story principal
export const Default: Story = {
  args: {
    src: 'https://placehold.co/1280x720?text=Default+Image',
  },
};

// Story con Drawer
export const WithDrawer: Story = {
  render: Template,
  args: {
    src: 'https://placehold.co/1280x720?text=With+Drawer',
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
