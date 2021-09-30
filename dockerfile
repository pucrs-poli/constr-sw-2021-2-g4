FROM node:14.16.1-alpine3.10 AS base
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .

RUN apk update && apk add bash

# RUN wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -O wait-for-it.sh && chmod +x wait-for-it.sh