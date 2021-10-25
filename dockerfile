FROM node AS base
COPY package*.json /app/

RUN mkdir -p /app
WORKDIR /app
COPY . /app

# VOLUME . /home/node/app

RUN npm install

RUN npm run tsoa:gen; 
RUN npm run build;
RUN echo 'npm run start' > entrypoint.sh

EXPOSE 5000

CMD [ "/bin/sh", "entrypoint.sh" ]