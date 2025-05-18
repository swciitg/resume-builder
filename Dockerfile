FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app
RUN npm install -g serve
COPY package* ./
RUN npm install
COPY . .
RUN npm run build