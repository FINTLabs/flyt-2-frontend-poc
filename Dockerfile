FROM node:22.12.0-alpine
WORKDIR /app
COPY . .

ENV PORT=8000
EXPOSE 8000
CMD ["npm", "start"]