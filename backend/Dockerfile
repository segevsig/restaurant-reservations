# Use Node 20
FROM node:20

WORKDIR /app

# Install dependencies (use npm ci for faster, reproducible builds)
# Use BuildKit cache mount for faster subsequent builds
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

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
