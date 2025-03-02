# Use Node.js image for building the React app
FROM node:22 as build
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
