# Imagen de desarrollo — el código se monta como volumen desde el host
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
