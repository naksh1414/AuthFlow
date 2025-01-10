# Use Node.js 18 as base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY . .

# Install and build backend
RUN cd Backend && \
    npm install && \
    npm run build

# Install and build frontend
RUN cd Frontend && \
    npm install --legacy-peer-deps && \
    npm run build

EXPOSE 3000
EXPOSE 8000    
# Start command will be handled by railway.toml
CMD ["sh", "-c", "cd Backend && npm start & cd Frontend && npm start"]