# Weather App

A simple weather application that provides real-time weather information using the OpenWeatherMap API.

## Prerequisites

- Node.js and npm installed on your system
- An API key from [OpenWeatherMap](https://openweathermap.org)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/repo-name.git
cd WeatherApp
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

## Configuration

1. Create environment file:

```bash
cp .env.example .env
```

2. Open `.env` and add your OpenWeatherMap API credentials:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

## Running the Application

### Backend Server

1. Navigate to the backend directory:

```bash
cd backend
```

2. Start the server:

```bash
nodemon index.js
```

### Frontend

You have several options to serve the frontend:

#### Option 1: Direct Browser Opening

- Simply open `index.html` in your preferred browser

#### Option 2: Using Live Server (Recommended)

1. Install Live Server VSCode extension:
   - Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) from VSCode marketplace
   - Right-click on `index.html` and select "Open with Live Server"

#### Option 3: Using NPM live-server

1. Install and run live-server:

```bash
cd WeatherApp
npm install live-server
npx live-server
```

## License

MIT
