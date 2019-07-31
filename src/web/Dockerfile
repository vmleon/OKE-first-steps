FROM node:12.7.0-alpine as build

WORKDIR /usr/src/web
ENV PATH /usr/src/web/node_modules/.bin:$PATH

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.17.2-alpine
COPY --from=build /usr/src/web/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]