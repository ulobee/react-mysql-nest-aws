# Use Node.js 16
FROM node:16

# Set working directory
WORKDIR /app

# Copy backend code
COPY server/package*.json ./
COPY server/ ./

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Expose port 8081
EXPOSE 8081

# Set environment variables (to be overridden by ECS task definition)
ENV PORT=8081
ENV DB_HOST=""
ENV DB_PORT="3306"
ENV DB_DATABASE=""
ENV DB_USERNAME=""
ENV DB_PASSWORD=""

# Start the application
CMD ["node", "dist/main.js"]
