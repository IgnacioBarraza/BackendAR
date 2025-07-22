# Backend Node.js con TypeScript, Express y TypeORM

Este proyecto es un backend desarrollado con Node.js, TypeScript, Express.js, TypeORM y PostgreSQL. Incluye autenticación JWT y gestión de favoritos.

## Requisitos

- Node.js (versión 18 o superior)
- npm o yarn
- PostgreSQL

## Instalación

1. Clona este repositorio:

   ```bash
   git clone git@github.com:IgnacioBarraza/BackendAR.git
   cd BackendAR
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto, basándote en `.env.example`:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASS=postgres
   DB_NAME=postgres
   DB_PORT=5432
   NODE_ENV=dev
   JWT_SECRET=supersecretjwtkey
   ```

   Asegúrate de reemplazar `DB_USER`, `DB_PASS` y `DB_NAME` con tus credenciales y nombre de base de datos de PostgreSQL.

2. Asegúrate de que tu servidor PostgreSQL esté corriendo y que la base de datos especificada en `DB_HOST` exista.

## Ejecución

### Modo Desarrollo

Para iniciar el servidor en modo desarrollo (con `nodemon` para recarga automática):

```bash
npm run dev
# o
yarn dev
```

### Modo Producción

1. Compila el código TypeScript a JavaScript:

   ```bash
   npm run build
   # o
   yarn build
   ```

2. Inicia el servidor:
   ```bash
   npm start
   # o
   yarn start
   ```

## Migraciones de Base de Datos (TypeORM)

Este proyecto está configurado con `synchronize: true` en `src/config/database.ts` para facilitar el desarrollo. Esto significa que TypeORM creará automáticamente las tablas en tu base de datos basándose en tus entidades. **Para entornos de producción, se recomienda encarecidamente usar migraciones.**

Para generar una migración (ejemplo):

```bash
npm run typeorm migration:generate
```

Para ejecutar las migraciones:

```bash
npm run typeorm migration:run
```

## Endpoints Disponibles

- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y obtiene un token JWT.
- `GET /api/favorites`: Obtiene los favoritos del usuario autenticado (requiere JWT).
- `POST /api/favorites`: Agrega un nuevo animal favorito (requiere JWT).

## Estructura del Proyecto

```
src/
├── config/
│   ├── database.ts
│   ├── cors.ts
│   ├── env-config.ts
│   └── jwt.ts
├── controllers/
│   ├── authController.ts
│   └── favoriteController.ts
├── entities/
│   ├── User.ts
│   └── Favorite.ts
├── middleware/
│   ├── auth.ts
│   └── errorHandler.ts
├── routes/
│   ├── authRoutes.ts
│   └── favoriteRoutes.ts
├── services/
│   ├── authService.ts
│   └── favoriteService.ts
├── utils/
│   ├── utils.ts
│   ├── dtos.ts
│   ├── jwt.ts
│   ├── password.ts
│   └── validation.ts
└── index.ts

.env
.env.example
package.json
tsconfig.json
```
