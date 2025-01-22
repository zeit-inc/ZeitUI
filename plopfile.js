const fs = require('fs');
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
      
      const content = svg.match(/<path[^>]*>[^<]*<\/path>|<path[^>]*\/>/g);
      
      if (!content) {
        console.log('No se encontraron elementos path en el SVG');
        return '';
      }

      console.log('Paths encontrados:', content);
      return content.join('\n    ');
      
    } catch (error) {
      console.error('Error procesando SVG:', error);
      return '';
    }
  };

  // Helper para actualizar index.ts
  const updateIndexFile = (iconName) => {
    const indexPath = 'packages/icons/src/index.ts';
    let content = '';

    // Si el archivo no existe, créalo con el contenido inicial
    if (!existsSync(indexPath)) {
      content = `export * from './${iconName}';\nexport type { IconSvgProps } from './types';`;
    } else {
      // Leer el contenido actual
      content = fs.readFileSync(indexPath, 'utf8');
      
      // Verificar si el icono ya está exportado
      if (!content.includes(`export * from './${iconName}';`)) {
        // Encontrar la posición antes de "export type"
        const typeExportPos = content.indexOf('export type');
        if (typeExportPos !== -1) {
          // Insertar la nueva exportación antes de "export type"
          content = content.slice(0, typeExportPos) + 
                   `export * from './${iconName}';\n` + 
                   content.slice(typeExportPos);
        } else {
          // Si no hay "export type", agregar al final
          content += `\nexport * from './${iconName}';`;
        }
      }
    }

    // Escribir el contenido actualizado
    fs.writeFileSync(indexPath, content);
  };

  plop.setGenerator('icon', {
    description: 'Genera un componente de icono basado en un archivo SVG',
    prompts: [
      {
        type: 'input',
        name: 'iconName',
        message: '¿Cómo se llamará el icono? (ej: plus-icon)',
      },
      {
        type: 'input',
        name: 'svgPath',
        message: 'Ruta del archivo SVG (relativa a la raíz del proyecto):',
        validate: (value) => {
          if (!value) return 'La ruta es requerida';
          if (!existsSync(value)) return 'El archivo no existe';
          return true;
        },
      },
    ],
    actions: (answers) => {
      console.log('Respuestas recibidas:', answers);
      
      const svgContent = processSvgContent(answers.svgPath);
      if (!svgContent) {
        throw new Error('No se pudo extraer el contenido del SVG');
      }

      // Actualizar index.ts después de crear el componente
      const actions = [
        {
          type: 'add',
          path: 'packages/icons/src/{{pascalCase iconName}}.tsx',
          templateFile: 'plop/icons/icon-component.tsx.hbs',
          data: {
            iconName: answers.iconName,
            svgContent: svgContent
          },
        },
        {
          type: 'custom',
          name: 'updateIndex',
          action: (answers) => {
            updateIndexFile(plop.getHelper('pascalCase')(answers.iconName));
            return 'Index.ts actualizado';
          }
        }
      ];

      return actions;
    },
  });
};