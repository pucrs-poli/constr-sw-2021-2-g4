FROM node:12-alpine

COPY package*.json /app/

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install

RUN echo 'npm run tsoa:gen;npm run build;npm run start' > entrypoint.sh

EXPOSE 5000

CMD [ "/bin/sh", "entrypoint.sh" ]