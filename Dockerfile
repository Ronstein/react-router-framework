# FROM node:20-alpine AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN npm ci

# FROM node:20-alpine AS production-dependencies-env
# COPY ./package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:20-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:20-alpine
# COPY ./package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["npm", "run", "start"]

# Etapa 1: Instala dependencias con Bun
FROM oven/bun:1.1.13 AS deps

WORKDIR /app
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# Etapa 2: Build con Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Copia fuentes y node_modules desde Bun
COPY --from=deps /app /app
COPY . .

# IMPORTANTE: forzar a usar react-dom/server, no la versión bun.js
RUN rm -f node_modules/react-dom/server.bun.js

# Build usando React Router
RUN npm run build

# Etapa 3: Imagen final
FROM node:20-alpine AS final

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
# Comando para ejecutar el servidor SSR
CMD ["npm","run", "start"]