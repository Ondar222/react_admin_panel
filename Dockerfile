FROM node:alpine as builder

WORKDIR /admin
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3010

VOLUME [ "/var/www/admin" ]
CMD ["npm", "run", "preview"]
