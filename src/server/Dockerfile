FROM node:12.7.0-alpine

WORKDIR /usr/src/server

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]
