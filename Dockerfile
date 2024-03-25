FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./
RUN npx prisma generate
COPY . .
CMD npm run start:dev