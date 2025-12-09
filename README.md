# Restaurant Reservations System

## Installation

### Prerequisites

- Docker and Docker Compose installed

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-reservations
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000/api
   - **View Database**:
     - **Option 1 - Prisma Studio** (Easiest):
       ```bash
       cd backend
       npx prisma studio
       ```
       Then open http://localhost:5555 in your browser
     - **Option 2 - pgAdmin** (Web Interface): http://localhost:5050
       - Email: `admin@admin.com`
       - Password: `admin`
       - After logging in, add a new server:
         - Host: `db`
         - Port: `5432`
         - Username: `postgres`
         - Password: `postgres`
         - Database: `reservations`
   - Database (Direct Connection): localhost:5432
     - Host: `localhost`
     - Port: `5432`
     - User: `postgres`
     - Password: `postgres`
     - Database: `reservations`
     - Connection String: `postgresql://postgres:postgres@localhost:5432/reservations?schema=public`

### Docker Commands

```bash
# Start services in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean database)
docker-compose down -v
```

