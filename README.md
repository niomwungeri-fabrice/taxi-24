![Test suites](https://github.com/niomwungeri-fabrice/taxi-24/workflows/Test%20suites/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/niomwungeri-fabrice/taxi-24/badge.svg?branch=docker-configurations)](https://coveralls.io/github/niomwungeri-fabrice/taxi-24?branch=docker-configurations)

# taxi-24
Taxi24 is a new startup based in Kigali. They would like to disrupt the taxi industry in Rwanda by providing a white-label solution to the existing taxi companies and hotels. Practically, they will build a set of APIs that other companies can use to manage their fleet of drivers and allocate drivers to passengers. They would like your help building these APIs

### Before Getting Started!
- Install nodejs
- Install postgreSQL
- Create a 2 databases 1 for `development` and 1 for `test`
- Update your .env by following guidelines in the `sample_env`

### Getting Started
- `$ git clone git@github.com:niomwungeri-fabrice/taxi-24.git`
- `$ cd taxi-42`
- Run `$ yarn install` or `$ npm install` to install the package dependencies
- Create and insert seed data in database `$ yarn run db:create` this will create tables and run database migrations
- `$ yarn start` to start development server.

### Running tests
- Inside the `taxi-2` ford
- Run `yarn test` Please insure your have created your `test` database!

### Functionalities
| EndPoint                     | Functionality             |
| ---------------------------- | ------------------------- |
| `GET api/v1/drivers`               | Get a list of all drivers         |
| `GET api/v1/drivers/available`              | Get a list of all available drivers           |
| `GET api/v1/drivers/available/range`     | Get a list of all available drivers within 3km for a specific location |
| `GET api/v1/drivers/{id}`           | Get a specific driver by ID          |
| `PUT api/v1/trips/{tripId}/complete`| Complete a trip        |
| `POST api/v1/trips`              | Create a new ‘Trip’ request by assigning a driver to a rider           |
| `GET api/v1/trips`              | Get a list of all trips |
| `GET api/v1/riders`    | Get a list of all riders          |
| `GET api/v1/riders/{id}` | Get a specific rider by ID           |
| `GET api/v1/riders/closest` | For a specific driver, get a list of the 3 closest drivers           |

### Bonus endpoints
| EndPoint                     | Functionality             |
| ---------------------------- | ------------------------- |
| `GET api/v1/invoices`               | Get a list of all invoices         |

### API documentation
https://documenter.getpostman.com/view/11352687/Szmh3cYp

### Project structure

```bash
├── app
│   ├── v1
│   │   ├── controllers
│   │   │     ├── driverController.js
│   │   │     ├── riderController.js
│   │   │     ├── tripController.js
│   │   ├── database
│   │   │     ├── models
│   │   │     ├── index.js
│   │   ├── helpers
│   │   │     ├── constants.js
│   │   │     ├── helpers.js
│   │   ├── middlewares
│   │   │     ├── errorHandler.js
│   │   │     ├── modelValidator.js
│   │   ├── routes
│   │   │     ├── index.js
│   │   │     ├── riderRoutes.js
│   │   │     ├── tripRoutes.js
│   │   │     ├── driverRoutes.js
│   │   ├── tests
│   │   │     ├── integration
│   │   │     ├── unit
│   │   ├── app.js
│   ├── v2(for future improvements)
├── build
├── node_modules
├── .bablrc
└── .env
└── .gitignore
├── index.js
├── LICENSE
├── package.json
├── README.md
└── sample_env
└── yarn.lock
```
### Project built with
- NodeJS
- ExpressJS
- PostGreSQL

### Reference
- Bank of Kigali