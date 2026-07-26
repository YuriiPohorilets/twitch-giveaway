FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/dashboard/package.json ./apps/dashboard/package.json

RUN npm ci


FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/server/node_modules ./apps/server/node_modules

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/server/tsconfig.json ./apps/server/tsconfig.json
COPY apps/server/src ./apps/server/src

RUN npm run build --workspace=apps/server


FROM node:24-alpine AS runner

WORKDIR /app/apps/server

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 giveaway

COPY --from=builder --chown=giveaway:nodejs /app/package.json /app/package-lock.json /app/
COPY --from=builder --chown=giveaway:nodejs /app/apps/server/package.json ./
COPY --from=builder --chown=giveaway:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=giveaway:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=giveaway:nodejs /app/apps/server/node_modules ./node_modules

USER giveaway

EXPOSE 3000

CMD ["node", "dist/index.js"]