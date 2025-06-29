FROM node:18-alpine

WORKDIR /app

# Package files kopyala
COPY package*.json ./

# Dependencies yükle
RUN npm ci --only=production

# Uygulama kodunu kopyala
COPY . .

# Next.js build
RUN npm run build

# Port expose et
EXPOSE 3000

# Uygulama başlat
CMD ["npm", "start"]
