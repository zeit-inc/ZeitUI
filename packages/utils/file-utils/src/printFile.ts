export function printFile(url: string) {
  // Crear un iframe temporal
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '-10000px'; // Mover el iframe fuera de la pantalla
  iframe.style.left = '-10000px';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  // Agregar el iframe al cuerpo del documento
  document.body.appendChild(iframe);

  // Esperar a que el iframe esté listo
  iframe.onload = () => {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDocument) {
      // Crear un contenedor para la imagen dentro del iframe
      const printContainer = iframeDocument.createElement('div');
      printContainer.style.width = '100%';
      printContainer.style.height = '100%';
      printContainer.style.display = 'flex';
      printContainer.style.justifyContent = 'center';
      printContainer.style.alignItems = 'center';

      // Crear la imagen para imprimir
      const img = iframeDocument.createElement('img');
      img.src = url;
      img.alt = 'Imagen para imprimir';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';

      // Agregar la imagen al contenedor
      printContainer.appendChild(img);

      // Agregar el contenedor al cuerpo del iframe
      iframeDocument.body.appendChild(printContainer);

      // Esperar a que la imagen se cargue completamente
      img.onload = () => {
        // Imprimir el contenido del iframe
        iframe.contentWindow?.print();

        // Eliminar el iframe después de imprimir
        window.addEventListener('afterprint', () => {
          document.body.removeChild(iframe);
        });
      };

      // Manejar errores de carga de la imagen
      img.onerror = () => {
        console.error('Error al cargar la imagen');
        document.body.removeChild(iframe);
      };
    }
  };

  // Iniciar la carga del iframe
  iframe.src = 'about:blank';
}
