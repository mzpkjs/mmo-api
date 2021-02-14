FROM node:15.8.0-alpine3.10 AS builder

ADD package.json .
ADD tsconfig.json .
ADD source source/
RUN npm install
RUN npm run build

FROM node:15.8.0-alpine3.10

COPY --from=builder distribution distribution/
COPY --from=builder node_modules node_modules/
EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT node distribution/index.js