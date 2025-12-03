ARG BASE_PATH=/

FROM node:22.12.0-alpine AS build
WORKDIR /app
ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.12.0-alpine
WORKDIR /app
ENV PORT=8000
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
EXPOSE 8000
CMD ["npm","start"]