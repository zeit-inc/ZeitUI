/* eslint-disable no-console */

// Constantes para extensiones permitidas por defecto
const DEFAULT_ALLOWED_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
];

// Constantes para tipos MIME permitidos
const MIME_TYPE_MAP: { [key: string]: string } = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

// Constantes para mensajes de error
const ERROR_MESSAGES = {
  HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
  FILE_SIZE_EXCEEDED: (maxSizeMB: number) =>
    `El archivo excede el tamaño máximo permitido de ${maxSizeMB} MB`,
  INVALID_EXTENSION: 'El archivo no tiene una extensión permitida',
  DOWNLOAD_ERROR: 'Error al descargar el archivo',
};

// Tamaño máximo por defecto (10 MB)
const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

// Clase personalizada para errores de descarga
class DownloadError extends Error {
  constructor(
    message: string,
    public details?: any,
  ) {
    super(message);
    this.name = 'DownloadError';
  }
}

type DownloadFileProps = {
  url: string;
  allowedExtensions?: string[];
  maxFileSize?: number;
  extensionDefault?: string;
};

export async function downloadFile({
  url,
  allowedExtensions = DEFAULT_ALLOWED_EXTENSIONS,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  extensionDefault = '.pdf',
}: DownloadFileProps) {
  try {
    const getFileNameFromUrl = (url: string): string => {
      const urlWithoutParams = url.split('?')[0].split('#')[0];
      const urlParts = urlWithoutParams.split('/');
      const fileName = urlParts[urlParts.length - 1];

      const hasValidExtension = allowedExtensions.some((ext) =>
        fileName.toLowerCase().endsWith(ext),
      );

      if (hasValidExtension) {
        return decodeURIComponent(fileName);
      }

      const extension = getExtensionFromContentType(response.headers.get('content-type'));
      const timestamp = new Date().toISOString().slice(0, 10);
      return `documento_${timestamp}${extension}`;
    };

    const getExtensionFromContentType = (contentType: string | null): string => {
      if (!contentType) return extensionDefault; // default
      return MIME_TYPE_MAP[contentType.toLowerCase()] || extensionDefault;
    };

    const response = await fetch(url);

    if (!response.ok) {
      throw new DownloadError(ERROR_MESSAGES.HTTP_ERROR(response.status), {
        status: response.status,
      });
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > maxFileSize) {
      throw new DownloadError(ERROR_MESSAGES.FILE_SIZE_EXCEEDED(maxFileSize / 1024 / 1024), {
        maxFileSize,
        actualSize: parseInt(contentLength, 10),
      });
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const fileName = getFileNameFromUrl(url);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    return {
      success: true,
      fileName,
      contentType: response.headers.get('content-type'),
    };
  } catch (error) {
    console.error(ERROR_MESSAGES.DOWNLOAD_ERROR, error);
    if (error instanceof DownloadError) {
      throw error; // Relanzar el error personalizado
    } else {
      throw new DownloadError(ERROR_MESSAGES.DOWNLOAD_ERROR, { originalError: error });
    }
  }
}
