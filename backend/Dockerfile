# Use Node 20
FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Start script that runs migrations and then starts the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
