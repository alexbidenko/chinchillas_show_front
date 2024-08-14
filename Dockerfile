FROM node:lts-alpine As base

RUN npm i --global --no-cache --no-update-notifier --no-fund pnpm

FROM base as dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

FROM base as build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build --chown=node:node /app/.output ./

USER node

ENV PORT=3333
EXPOSE 3333

CMD ["node", "server/index.mjs"]
