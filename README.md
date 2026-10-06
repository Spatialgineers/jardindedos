# Jardín de dos 🌱

Aplicación de finanzas personales y agenda compartida para Danelson y Alana. Las cuentas se representan como plantas que crecen y florecen con sus hábitos.

## Funciones

- Cuentas individuales y compartidas con presupuestos mensuales.
- Ingresos, gastos y transferencias, con edición y borrado que corrigen balances.
- Pagos recurrentes: un pago por periodo, verificado en el servidor y protegido frente a escrituras simultáneas.
- Metas de ahorro, energía, flores desbloqueables y efectos visuales.
- Plantas reales: cantidad de agua, frecuencia, historial y calendario de riego.
- Agenda para estudios, trabajo, citas y recordatorios; incluye vencimientos y riegos.
- Importación y exportación iCalendar (.ics), con repeticiones y conversión de horas a Puerto Rico.
- Interfaz móvil con registro rápido, señales visuales, siguiente paso y bloques de enfoque.

## Estado actual

La app está publicada en https://jardin-de-dos.spatialgineers.chatgpt.site.

La integración con Google Calendar es manual mediante archivos `.ics`; no existe sincronización automática con Google. El acceso de otra persona al sitio debe habilitarse por separado. El temporizador funciona mientras la app está abierta y no envía notificaciones.

Las cuentas individuales son etiquetas dentro de un hogar compartido, no espacios privados separados. El endpoint guarda un único jardín. Para alojar múltiples hogares se necesita autorización por hogar y separación de sus registros.

## Stack

React 19, TypeScript, Vinext, Vite, Cloudflare Workers, D1, Drizzle, Zod, Lucide e ical.js. La autenticación de producción usa el acceso de ChatGPT Sites.

## Instalar y verificar

Requisitos: Node.js 24 y pnpm 11.25.0.

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
```

Las 18 pruebas cubren balances, transferencias, borrado, periodos de recurrentes, fin de mes, riegos, energía, validación e importación/exportación de calendarios.

## Base de datos local

La migración está en `drizzle/0000_productive_lifeguard.sql`. Tras compilar, aplícala una sola vez a la base local:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_productive_lifeguard.sql
pnpm dev
```

El desarrollo portátil usa identidad simulada. Para producción conserva la autenticación y las restricciones de acceso de Sites. Un despliegue independiente necesita implementar una autenticación y autorización equivalentes; no confíes en cabeceras de identidad enviadas por visitantes.

## Archivos principales

- `app/garden.tsx`: jardín, finanzas, plantas y navegación.
- `app/garden-model.ts`: balances, periodos, riegos y energía.
- `app/api/garden/route.ts`: persistencia y pagos con control de revisión.
- `app/agenda.tsx` y `app/calendar-io.ts`: agenda e iCalendar.
- `app/focus-card.tsx`: siguiente paso y temporizador.
- `app/plant.tsx`: plantas y flores animadas.
- `db/` y `drizzle/`: esquema y migraciones.
- `tests/`: pruebas de lógica.

## Despliegue

Esta copia conserva la configuración técnica de Sites, pero omite el identificador del sitio existente. Para publicar desde una copia, registra un nuevo Site y asigna su identificador con el flujo de Sites. GitHub guarda el código; subirlo no cambia automáticamente el sitio en producción.

No se incluyen datos financieros, bases de datos de producción, calendarios personales, credenciales, dependencias instaladas ni resultados de compilación.

Proyecto de Spatialgineers. No se concede una licencia de redistribución por defecto.
