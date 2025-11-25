FROM node:18-alpine AS deps
WORKDIR /app
COPY backend/package.json ./
RUN npm install --production
COPY backend ./backend
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "server.js"]
