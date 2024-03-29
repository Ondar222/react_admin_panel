FROM node:alpine as builder

WORKDIR /admin
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

VOLUME "/var/www/admin/dist"
