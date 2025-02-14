# Use Node.js as base image
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Start the worker service
CMD ["node", "dist/worker.bootstrap.js"]
