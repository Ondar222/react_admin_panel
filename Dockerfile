FROM node:alpine as builder

WORKDIR /admin
COPY package*.json ./
COPY . .

RUN rm -rf /var/www/admin
RUN mkdir /var/www/admin

RUN npm install
RUN npm run build

EXPOSE 3000

VOLUME [ "/var/www/admin" ]
CMD ["npx", "serve", "-s", "dist"]
