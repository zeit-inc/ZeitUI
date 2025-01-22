import type { Meta, StoryObj } from "@storybook/react";
import { ImageViewerContainer } from "../src";

const meta = {
  title: "Components/ImageViewer/Container",
  component: ImageViewerContainer,
  parameters: {
    layout: "fullscreen", // Ya que tu componente usa altura completa
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  // Definimos los argumentos por defecto
  args: {
    src: "https://placehold.co/1280x720?text=Default+Image", // Placeholder por defecto
  },
  // Definimos los controles para los props
  argTypes: {
    src: {
      control: "text",
      description: "URL de la imagen a mostrar",
      type: { name: "string", required: true },
    },
  },
} satisfies Meta<typeof ImageViewerContainer>;

export default meta;
type Story = StoryObj<typeof ImageViewerContainer>;

// Story principal
export const Default: Story = {
  args: {
    src: "https://placehold.co/1280x720?text=Default+Image", // Imagen horizontal por defecto
  },
};

// Story con imagen vertical
export const VerticalImage: Story = {
  args: {
    src: "https://placehold.co/720x1280?text=Vertical+Image", // Imagen vertical
  },
};

// Story con imagen muy grande
export const LargeImage: Story = {
  args: {
    src: "https://placehold.co/2000x1500?text=Large+Image", // Imagen grande
  },
};

// Story con imagen pequeña
export const SmallImage: Story = {
  args: {
    src: "https://placehold.co/150x150?text=Small+Image", // Imagen pequeña
  },
};

// Story que muestra cómo se comporta con un error de carga
export const ErrorImage: Story = {
  args: {
    src: "https://placehold.co/invalid", // Imagen de error con fondo rojo
  },
};
