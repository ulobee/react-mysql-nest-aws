# Stage 1: Build React App
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy frontend code
COPY client/package*.json ./
COPY client/ ./

# Set environment variable
ENV REACT_APP_API_URI=/api/

# Install dependencies and build
RUN npm install
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:latest

# Copy build artifacts
COPY --from=build /app/build /usr/share/nginx/html

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration
COPY frontend/nginx.conf /etc/nginx/conf.d

# Expose port 8082
EXPOSE 8082

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
