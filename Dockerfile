FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx
EXPOSE 3000

COPY --from=builder /app/build /usr/share/nginx/html