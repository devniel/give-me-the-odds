# 🪐 Give me the odds - `WEB` UI

## ⚡️ Demo
https://give-me-the-odds.devniel.com

*You can use the examples saved in `@repo/fixtures` to test the UI.

## 🚀 Running locally

*The project requires the `api` app running in `API_URL` or `http://localhost:3001` port.

#### With Docker
Docker will automatically run the `api` before launching the `web` ui app.
```bash
docker compose up
```
👀 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


After checking the result, you can remove all generated artifacts via:
```bash
docker compose down
```
---
#### Without Docker

- Install Node, at least v18.17, you can use NVM https://github.com/nvm-sh/nvm.
- Install dependencies 
```bash
npm install
```
- Build the project 
```bash
npm run build
```
- Run the `api` app in `API_URL` or `http://localhost:3001`, see its README.
- Launch the `web` app using the proper envs.
```bash
API_URL=http://localhost:3001 BASE_URL=http://localhost:3000 PORT=3000 npm start
```
👀 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Soloist font.

## 🧪 How to run tests

- Install playwright browsers using `npx playwright install`.
- Then launch the tests
```
npm run test
```


## 📚 Learn More

The project is done with Next.js (a full-stack React framework), ideal for MVPs and production-grade projects.

For the Holter Record Summary, the back-end service is located in `src/app/api`, all the rest is front-end but it uses Next.js back-end capabilities (e.g. Server Side Rendering).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
