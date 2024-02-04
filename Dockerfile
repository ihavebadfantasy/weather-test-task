FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY wait-for-db.sh /app/wait-for-db.sh

RUN chmod +x /app/wait-for-db.sh

RUN ls -l /app

CMD ["bash", "/app/wait-for-db.sh", "db:5432", "--timeout=60", "--", "npm", "start"]


