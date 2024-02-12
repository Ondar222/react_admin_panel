FROM node:alpine as builder

WORKDIR /admin
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3010

CMD ["npm", "run", "preview"]
