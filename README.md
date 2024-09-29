# Playwright Hello

This project is a simple example of how to use Playwright with OpenAPI-Generator to test a REST API.

## Install Tools

- OpenAPI-Generator

```bash
npm install -g @openapitools/openapi-generator-cli
openapi-generator-cli version-manager set 7.8.0
```

## How to run

1. Generate the client code (if required)

```bash
npx openapi-generator-cli generate -i petstore3.json -o api-client -g typescript-fetch
```

2. Install dependencies

```bash
npm install
```

3. Run the tests

```bash
npx playwright test
```
