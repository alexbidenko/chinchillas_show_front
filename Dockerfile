FROM node:20-alpine as dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:20-alpine as builder

WORKDIR /app

COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build

USER node

CMD ["yarn", "start"]
