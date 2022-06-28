FROM node:16-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm i

COPY . .

# EXPOSE 8080

CMD [ "node", "build/index.js" ]