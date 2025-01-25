const fs = require('fs');
const path = require('path');
const {existsSync} = require('fs');

// Helpers para capitalizar y camelCase
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

// Directorios de trabajo y generadores
const generators = ['component', 'package', 'hook'];
const workspaces = ['components', 'core', 'hooks', 'utils'];

// Directorios de salida por defecto
const defaultOutDirs = {
  component: 'components',
  hook: 'hooks',
  package: 'utils',
};

module.exports = function (plop) {
  console.log('Plop está iniciando...');

  // Helpers para capitalizar y camelCase
  plop.setHelper('capitalize', (text) => {
    return capitalize(camelCase(text));
  });
  plop.setHelper('camelCase', (text) => {
    return camelCase(text);
  });

  // Generador de iconos (tu configuración actual)
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

  // Nuevos generadores (component, package, hook)
  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: 'input',
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,
          validate: (value) => {
            if (!value) {
              return `${gen} name is required`;
            }

            // Validación específica para hooks
            if (gen === 'hook' && !value.startsWith('use-')) {
              return "Hook name must start with 'use-'";
            }

            // Validación para nombres en minúscula
            if (value !== value.toLowerCase()) {
              return `${gen} name must be in lowercase`;
            }

            // Validación para evitar espacios
            if (value.includes(' ')) {
              return `${gen} name cannot have spaces`;
            }

            return true;
          },
        },
        {
          type: 'input',
          name: 'description',
          message: `The description of this ${gen}:`,
        },
        {
          type: 'list',
          name: 'outDir',
          message: `Where should this ${gen} live?`,
          default: defaultOutDirs[gen],
          choices: workspaces,
          validate: (value) => {
            if (!value) {
              return `outDir is required`;
            }
            return true;
          },
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        const {description, outDir} = answers;
        const generatorName = answers[`${gen}Name`] ?? '';

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir,
        };

        actions.push({
          type: 'addMany',
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        return actions;
      },
    });
  });
};

// Función para procesar el contenido de los archivos SVG
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
      /<circle[^>]*>|<line[^>]*>|<path[^>]*>|<rect[^>]*>|<polygon[^>]*>|<polyline[^>]*>/g,
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
