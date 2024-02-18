# 🪐 Give me the odds - CLI


The command-line interface consists of an executable that takes 2 files paths as input (respectively the paths toward the `millennium-falcon.json` and `empire.json` files) and prints the probability of success as a number ranging from 0 to 100.

```sh
$ give-me-the-odds example1/millennium-falcon.json example1/empire.json
81
```

## 🚀 How to run it locally

### Using NPM (dev mode)

- Install Node, at least v18.17, you can use NVM https://github.com/nvm-sh/nvm.
- Install dependencies with 
```bash
npm install
```
- Build a development version
```bash
npm run build:dev
```
- Run the cli
```bash
./bin/run --help
```
- It will print:
```bash
USAGE
  $ give-me-the-odds odds MILLENNIUMFALCON EMPIRE

ARGUMENTS
  MILLENNIUMFALCON  The millennium-falcon JSON file path
  EMPIRE            The empire JSON file path details

EXAMPLES
  $ give-me-the-odds odds example1/millennium-falcon.json example1/empire.json
```

## 📦 How to build and use binaries artifacts 

- Install `Using NPM` requirements.
- Build a production version:
```bash
npm run build
```
- Artifacts will be saved in `artifacts`.
- Use them based on your current architecture. e.g. for Apple Silicon, use the `*linux-arm64.tar.gz` one.
- Uncompress it via
```bash
tar -xvf ./artifacts/give-me-the-odds-v0.0.0-27f3e4f-darwin-arm64.tar.gz`
```
- The `give-me-the-odds` folder will have the binary inside `bin`.
- Use it via:
```bash
./give-me-the-odds/bin/give-me-the-odds --help
```
- It will print:
```bash
USAGE
  $ give-me-the-odds odds MILLENNIUMFALCON EMPIRE

ARGUMENTS
  MILLENNIUMFALCON  The millennium-falcon JSON file path
  EMPIRE            The empire JSON file path details

EXAMPLES
  $ give-me-the-odds odds example1/millennium-falcon.json example1/empire.json
``` 
- The fixtures are available to test all the provided examples:
```bash
./give-me-the-odds/bin/give-me-the-odds ../../packages/fixtures/common/millennium-falcon.json ../../packages/fixtures/example-1/empire.json 
```