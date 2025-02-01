# @zeitui-org/image-viewer

Un componente de visualización de imágenes para React con capacidades de zoom y desplazamiento.

## Características

- 🔍 Zoom in/out con controles intuitivos
- 🔄 Rotación de imagen
- ⬇️ Descarga de imagen
- 🖨️ Impresión de imagen
- 📱 Modo pantalla completa
- 🔄 Reset a vista original
- 🎨 Personalización de controles
- 📦 Ligero y fácil de usar

## Requisitos

- React 18 o superior
- React DOM 18 o superior
- Tailwind CSS 3.x (Se recomienda usar Tailwind CSS 3 por estabilidad y compatibilidad. Si bien el componente podría funcionar con Tailwind CSS 4, no se garantiza la compatibilidad completa hasta que esta versión sea estable)

> [!NOTE] 
> Se recomienda específicamente usar Tailwind CSS 3.x ya que es la versión estable actual y ha sido probada exhaustivamente con este componente.

## Instalación

### 1. Instalar el componente principal

#### npm
```bash
npm install @zeitui-org/image-viewer
```

#### pnpm
```bash
pnpm add @zeitui-org/image-viewer
```

#### yarn
```bash
yarn add @zeitui-org/image-viewer
```

### 2. Instalar dependencias de HeroUI

El componente utiliza HeroUI para los controles. Necesitas instalar los siguientes paquetes:

#### npm
```bash
npm install @heroui/button @heroui/theme @heroui/system framer-motion
```

#### pnpm
```bash
pnpm add @heroui/button @heroui/theme @heroui/system framer-motion
```

#### yarn
```bash
yarn add @heroui/button @heroui/theme @heroui/system framer-motion
```

### Configuración especial para pnpm

Si estás usando pnpm, necesitas añadir la siguiente línea a tu archivo `.npmrc`:

```
public-hoist-pattern[]=*@heroui/*
```

## Configuración

### 1. Tailwind CSS

Modifica tu archivo `tailwind.config.js`:

```js
const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    // ... otras configuraciones
    "./node_modules/@zeitui-org/**/*.{js,jsx,ts,tsx}",
    // Estilos de componentes HeroUI necesarios
    "./node_modules/@heroui/theme/dist/components/(button).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],  // Añade el plugin de HeroUI
}
```

## Uso

```jsx
import { ImageViewer } from '@zeitui-org/image-viewer';

function App() {
  return (
    <ImageViewer src="ruta-de-tu-imagen.jpg"/>
  );
}
```

## Props

| Prop | Descripción | Tipo | Valor por defecto |
|------|-------------|------|-------------------|
| src* | URL de la imagen a mostrar | string | - |
| controlVariant | Estilo de los controles | 'solid' \| 'bordered' \| 'light' \| 'flat' \| 'faded' \| 'shadow' \| 'ghost' | 'solid' |
| controlColor | Color de los controles | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | 'default' |
| controlSize | Tamaño de los controles | 'sm' \| 'md' \| 'lg' | 'md' |
| controlRadius | Radio de los controles | 'none' \| 'sm' \| 'md' \| 'lg' \| 'full' | 'lg' |

## Ejemplos

### Visor Básico
```jsx
<ImageViewer src="https://ejemplo.com/imagen.jpg" />
```

## Licencia

[MITlicense](https://github.com/zeit-inc/ZeitUI/blob/main/LICENSE).
