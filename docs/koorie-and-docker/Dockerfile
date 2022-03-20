FROM node:16.14.2-bullseye-slim

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npx", "koorie", "--port=3000", "--static-files=public", "--address=0.0.0.0" ]
