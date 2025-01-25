# @zeitui-org/file-fetch-utils

**Este paquete está obsoleto.** En su lugar, utilice [`@zeitui-org/file-utils`](https://github.com/zeit-inc/Zeit-Ui/tree/main/packages/utils/file-utils).

## Guía de migración

Para migrar de `@zeitui-org/file-fetch-utils` a `@zeitui-org/file-utils`, siga estos pasos:

1. Instale el nuevo paquete:

```bash
npm install @zeitui-org/file-utils
```

2. Actualice sus importaciones:

```ts
// Antes
import { DownloadFile } from '@zeitui-org/file-fetch-utils';

// Después
import { downloadFile } from '@zeitui-org/file-utils';
```

3. Actualice cualquier cambio de API según sea necesario.