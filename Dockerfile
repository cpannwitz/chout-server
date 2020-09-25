FROM node:14.9.0-alpine AS development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run install --network-concurrency=1

COPY . .

EXPOSE 4000

RUN npm run build

FROM node:14.9.0-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod:migrations"]