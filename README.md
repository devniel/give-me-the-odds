# 🪐 Give me the odds

Returns the odds that the Millennium Falcon reaches Endor in time and saves the galaxy.

## ⚡️ Demo
https://give-me-the-odds.devniel.com

*You can use the `./packages/fixtures/example-n/empire.json` files to test it.

## 🚀 How to run the web app locally ?

### 🐳 With Docker
```bash
docker compose up
```
👀 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After checking the result, you can remove all generated artifacts via:
```bash
docker compose down
```

### 🐢 Without docker
- Install Node, at least v18.17, you can use NVM https://github.com/nvm-sh/nvm.
- Install dependencies 
```bash
npm install
```
- Build the project 
```bash
npm run build
```
- Start the project (web and api)
```
npm run start
```

## 🔳 How to run the CLI ?

### Download them
- Available for different architectures here:
https://drive.google.com/drive/folders/1domk3MgVxXIfE2E0KrtEqqxvhkLm-lyg?usp=drive_link
- Check how to run them in the [CLI documentation](./apps/cli/README.md#📦-How-to-build-and-use-binaries-artifacts).

### Build them locally

- Install Node, at least v18.17, you can use NVM https://github.com/nvm-sh/nvm.
- Install dependencies 
```bash
npm install
```
- Build the project 
```bash
npm run build
```
- Binaries are available in the `artifacts` folder.
- Check more in the [CLI documentation](./apps/cli/README.md#📦-How-to-build-and-use-binaries-artifacts).

## 🏗️ Architecture

The project is a monorepo consisting of the following main apps and internal packages:

### 📱 Apps

- api
    - Provides the back-end services for the `web` app.
- cli
    - Provides the binary artifacts to use the core logic via a cli.
-  web
    - Provides the `web` front-end of the app.

### 📚 Packages

- core
     - Provides the core business logic of the use case.
- fixtures
    - Provides static files to test the project (provided examples and results are saved here).


## 📦 How to build the project ?

- Each app/package could build artifacts independently, with turborepo we can run all of them at once via:
```
npm run build
```

## 🧪 How to run the tests ?

- Each app/package could run its tests independently, with turborepo we can run all of them at once via:
- Make sure the port `3000` and `3001` are not used as they are used by default on tests.
```
npm run test
```
