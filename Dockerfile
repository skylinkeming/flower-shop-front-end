FROM node:18 as builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR '/app'

COPY ./package.json ./pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx

EXPOSE 3000

COPY --from=builder /app/build /usr/share/nginx/html