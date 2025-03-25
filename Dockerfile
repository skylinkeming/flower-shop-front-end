# 🏗️ 建立基礎環境
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# 📦 安裝生產依賴
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 🛠️ 建置應用
FROM base AS builder
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# 🚀 部署到 nginx
FROM nginx AS runner
EXPOSE 3000
COPY --from=builder /app/build /usr/share/nginx/html