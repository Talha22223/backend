FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev

COPY . .

RUN npm run prisma:generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/server.js"]
