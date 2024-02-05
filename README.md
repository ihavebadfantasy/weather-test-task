# Weather App

This project fetches weather data from [OpenWeatherMap API](https://openweathermap.org/api/one-call-3#current) and stores it in a PostgreSQL database. The project provides two accessible APIs:

1. **POST API:**
    - Endpoint: `/weather`
    - Accepts `lat`, `lon`, and `part` parameters.
    - Fetches data from the OpenWeatherMap API and stores it in the database.

2. **GET API:**
    - Endpoint: `/weather`
    - Accepts `lat`, `lon`, and `part` parameters.
    - Retrieves weather data from the database based on the provided latitude, longitude, and part parameters.

## Requirements

- Docker should be installed on your machine.

## Running the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Copy .env file from .env.example and complete the fields with correspondent values:**
   ```bash
   cp .env.example .env
   ```

3. **Build and Run the Docker Containers:**
   ```bash
    docker-compose up --build
   ```

4. **Access the Application:**
- **Nest.js API:** [http://localhost:3000](http://localhost:3000)
- **pgAdmin:** [http://localhost:5050](http://localhost:5050)
    - **Email:** `in .env`
    - **Password:** `in .env`

## API Documentation:

Swagger documentation is available at: [http://localhost:3000](http://localhost:3000)

## Notes:

- The application uses a PostgreSQL database to store weather data. Data is stored in JSON format.
- Unit tests are optional and not included in this example.
