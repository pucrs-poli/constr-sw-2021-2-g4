FROM node:14.16.1-alpine3.10 AS base
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . .

EXPOSE 5000

RUN apk update && apk add bash

RUN npm run tsoa:gen; 
RUN npm run build; \
    npm run start > entrypoint.sh

ENTRYPOINT [ "executable" ]

# CMD [ "/bin/sh", "entrypoint.sh" ]/
