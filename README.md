

# Trader

This project was generated using [Nx](https://nx.dev).

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Running The Project

1. First you will need to populate the secrets.json file with api keys.

     a) As the secrets.json file is ignored by git, you will need to create a secrets.json file in the root of the project with the following content:

```json
{
  "binance":{
    "apiKey":"",
    "apiSecret":""
  }
}
```

2. To launch the client web app, open a terminal instance and execute `ng serve`.
3. To launch the client api, open a second terminal instance and execute `npx nx run api:serve`.
4. Open a browser and navigate to `localhost:4200`.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Dependency Documentation

1. [Binance](https://github.com/Ashlar/binance-api-node)