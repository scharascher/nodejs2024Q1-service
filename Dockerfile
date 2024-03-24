FROM node:latest
WORKDIR /app
COPY . .
COPY .env ./
RUN npm install
RUN npx prisma generate
CMD npm run start:dev