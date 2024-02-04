FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y wait-for-it

COPY . .

RUN npm run build

CMD ["wait-for-it", "db:5432", "--timeout=60", "--", "npm", "start"]


