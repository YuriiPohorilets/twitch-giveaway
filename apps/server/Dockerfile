FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json ./
COPY src ./src

RUN npm run build
RUN npm prune --omit=dev


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 giveaway

COPY --from=builder --chown=giveaway:nodejs /app/package.json ./
COPY --from=builder --chown=giveaway:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=giveaway:nodejs /app/dist ./dist

USER giveaway

EXPOSE 3000

CMD ["node", "dist/index.js"]