# import image node versi 18 alpine
# Base image Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy semua file aplikasi
COPY . .

# Expose port 3000
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["node", "app.js"]