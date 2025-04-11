FROM node:22-alpine AS base

RUN npm i --global --no-cache --no-update-notifier --no-fund pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:22-alpine

WORKDIR /app

COPY --from=build --chown=node:node /app/.output ./

USER node

ENV PORT=3333
EXPOSE 3333

CMD ["node", "server/index.mjs"]
