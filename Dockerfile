FROM node:latest
WORKDIR /app
COPY . .
COPY .env ./
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]