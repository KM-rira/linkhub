FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS runner
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY package.json bun.lock ./
COPY index.ts ./

EXPOSE 3000
CMD ["bun", "run", "start"]
