FROM node:alpine as builder

WORKDIR /admin
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build:prod

EXPOSE 4000

VOLUME [ "/var/www/admin" ]
CMD ["npm", "run", "serve"]
