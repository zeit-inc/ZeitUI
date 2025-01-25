export function printFile(url: string) {
  // Crear un contenedor temporal para la imagen
  const printContainer = document.createElement('div');
  printContainer.style.position = 'fixed';
  printContainer.style.top = '0';
  printContainer.style.left = '0';
  printContainer.style.width = '100%';
  printContainer.style.height = '100%';
  printContainer.style.backgroundColor = 'white';
  printContainer.style.zIndex = '9999';
  printContainer.style.display = 'flex';
  printContainer.style.justifyContent = 'center';
  printContainer.style.alignItems = 'center';

  // Crear la imagen para imprimir
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Imagen para imprimir';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.objectFit = 'contain';

  // Agregar la imagen al contenedor
  printContainer.appendChild(img);

  // Agregar el contenedor al cuerpo del documento
  document.body.appendChild(printContainer);

  // Imprimir la página
  window.print();

  // Eliminar el contenedor después de imprimir
  document.body.removeChild(printContainer);
}