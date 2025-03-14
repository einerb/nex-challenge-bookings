FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn cache clean && yarn install

COPY prisma ./prisma

RUN ls -la prisma/ && cat prisma/schema.prisma

RUN npx prisma generate

COPY . .

RUN yarn build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["yarn", "start:prod"]
