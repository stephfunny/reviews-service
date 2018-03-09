# Dockerfile for deployment of reviews-microservice w/ mongo db
FROM node:9

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3001

CMD [ "npm", "start" ]

