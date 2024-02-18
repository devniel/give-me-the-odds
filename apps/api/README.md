# 🪐 Give me the odds - REST `API`

## ⚡️ Available endpoints

- POST `/odds`
    - Returns a `ItinerarySummary` based on loaded `MillenniumFalcon` config and `Empire` input.
- GET `/millenniumFalcom`
    - Returns the current loaded `MillenniumFalcon` config at startup.

## ⚙️ Config

To load the `MillenniumFalcon` config, it should be set via an environment variable `MILLENNIUM_FALCON_PATH`:

Example: 
```bash
MILLENNIUM_FALCON_PATH=/opt/millenniumFalcon.json node dist/server.js
````

## 🚀 How to run it locally

### Without docker

- Install Node, at least v18.17, you can use NVM https://github.com/nvm-sh/nvm.
- Then, run the following commands :
- Build the project
```bash
npm run build
```

- Launch the server using a custom `API_PORT` or `PORT` and `MILLENNIUM_FALCON_PATH` environment variable. Default used port is `3001`.
```bash
PORT=3001 MILLENNIUM_FALCON_PATH=/home/users/tester/millenniumFalcon.json node dist/server.js
```
- 👀 Open [http://localhost:3001/millenniumFalcon](http://localhost:3001/millenniumFalcon) with your browser to see the loaded `MillenniumFalcon` config.


## 🧪 How to run tests

- Install playwright browsers using `npx playwright install`.
- Then launch the tests
```
npm run test
```
