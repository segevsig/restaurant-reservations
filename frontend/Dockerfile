# Use Node 20
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (this will install Linux-compatible binaries)
RUN npm install

# Copy source code (node_modules will be excluded by .dockerignore)
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
