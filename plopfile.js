const fs = require('fs');
const path = require('path');
const {existsSync} = require('fs');

module.exports = function (plop) {
  console.log('Plop está iniciando...');

  const processSvgContent = (filePath) => {
    try {
      console.log('Procesando archivo:', filePath);

      if (!existsSync(filePath)) {
        console.log(`El archivo no existe en la ruta: ${filePath}`);
        return '';
      }

      const svg = fs.readFileSync(filePath, 'utf8');
      console.log('SVG leído:', svg);

      // Extraer solo los elementos gráficos internos (sin el contenedor <svg>)
      const content = svg.match(
        /<circle[^>]*>|<line[^>]*>|<path[^>]*>|<rect[^>]*>|<polygon[^>]*>/g,
      );

      if (!content) {
        console.log('No se encontraron elementos gráficos en el SVG');
        return '';
      }

      console.log('Elementos gráficos encontrados:', content);
      return content.join('\n    ');
    } catch (error) {
      console.error('Error procesando SVG:', error);
      return '';
    }
  };

  plop.setGenerator('icon', {
    description: 'Genera componentes de iconos basados en archivos SVG de un directorio',
    prompts: [
      {
        type: 'input',
        name: 'svgDirectory',
        message:
          'Ruta del directorio que contiene los archivos SVG (relativa a la raíz del proyecto):',
        validate: (value) => {
          if (!value) return 'La ruta es requerida';
          if (!existsSync(value)) return 'El directorio no existe';
          return true;
        },
      },
    ],
    actions: (answers) => {
      console.log('Respuestas recibidas:', answers);

      const svgFiles = fs.readdirSync(answers.svgDirectory).filter((file) => file.endsWith('.svg'));
      if (svgFiles.length === 0) {
        throw new Error('No se encontraron archivos SVG en el directorio especificado');
      }

      const iconNames = svgFiles.map((file) => path.basename(file, '.svg'));
      const actions = [];

      svgFiles.forEach((file, index) => {
        const filePath = path.join(answers.svgDirectory, file);
        const svgContent = processSvgContent(filePath);
        if (!svgContent) {
          throw new Error(`No se pudo extraer el contenido del SVG: ${file}`);
        }

        actions.push({
          type: 'add',
          path: `packages/icons/src/${plop.getHelper('pascalCase')(iconNames[index])}.tsx`,
          templateFile: 'plop/icons/icon-component.tsx.hbs',
          data: {
            iconName: iconNames[index],
            svgContent: svgContent,
          },
        });
      });

      return actions;
    },
  });
};
