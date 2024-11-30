FROM node:21-bullseye-slim AS base

FROM base AS deps

WORKDIR /blog

ADD package.json .npmrc ./
RUN npm install --include=dev

FROM base AS production-deps

WORKDIR /blog

COPY --from=deps /blog/node_modules /blog/node_modules
ADD package.json .npmrc ./
RUN npm prune --omit=dev

FROM base AS build

WORKDIR /blog
COPY --from=deps /blog/node_modules /blog/node_modules

ADD . .
ENV NODE_ENV=production
RUN npm run build

FROM base
WORKDIR /blog

COPY --from=production-deps /blog/node_modules /blog/node_modules

COPY --from=build /blog/build /blog/build
COPY --from=build /blog/public /blog/public
ADD . .

CMD ["npm", "start"]