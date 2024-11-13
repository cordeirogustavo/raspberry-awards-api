# Express API Boilerplate

This is a scalable and modular boilerplate for building APIs using **Express**, **TypeScript**, and **Tsyringe** (Dependency Injection). It also includes **Vitest** for testing and **Zod** for schema validation.

## Stack

- **Node.js** - JavaScript runtime
- **TypeScript** - Static typing for JavaScript
- **Express** - Web framework for building APIs
- **Tsyringe** - Dependency Injection library for TypeScript
- **Zod** - Schema validation
- **Vitest** - Testing framework

## Project Structure

The project follows a modular structure, where each module contains its own controllers, services, routes, and tests. Shared utilities, middlewares, and providers are placed in common directories to promote reusability.

```bash
src/
├── database/                   # Folder to put movielist.csv to import data
│   └── movielist.csv           # csv file to seed database on api start
├── domain/                     # Domains from application
│   └── health/                 # Order module
│   │    ├── index.ts                         # Default file to export module
│   │    ├── health.container.ts              # Dependency injection settings from module
│   │    ├── health.controller.interface.ts   # Controller interface
│   │    ├── health.controller.ts             # Controller
│   │    ├── health.router.ts                 # Router
│   │    └── health.symbols.ts                # Symbols for dependency injection
│   └── movie/                  # Movie module
│   │    └── tests/              # Tests
│   │      └── movie.repository.spec.ts      # Repository test file
│   │    ├── index.ts                        # Default file to export module
│   │    ├── movie.container.ts              # Dependency injection settings from module
│   │    ├── movie.controller.interface.ts   # Controller interface
│   │    ├── movie.controller.ts             # Controller
│   │    ├── movie.repository.interface.ts   # Repository interface
│   │    ├── movie.repository.ts             # Repository
│   │    ├── movie.router.ts                 # Router
│   │    ├── movie.schema.ts                 # Zod Schema validate
│   │    ├── movie.service.interface.ts      # Service (use-case) interface
│   │    ├── movie.service.ts                # Service (use-case)
│   │    └── movie.symbols.ts                # Symbols for dependency injection
│   │    └── movie.types.ts                  # Domain types
│   └── producer/               # Producer module
│   │    └── tests/              # Tests
│   │    │  ├── producer.controller.spec.ts      # Controller test file
│   │    │  ├── producer.repository.spec.ts      # Repository test file
│   │    │  └── producer.service.spec.ts         # Service test file
│   │    ├── index.ts                            # Default file to export module
│   │    ├── producer.container.ts               # Dependency injection settings from module
│   │    ├── producer.controller.interface.ts    # Controller interface
│   │    ├── producer.controller.ts              # Controller
│   │    ├── producer.repository.interface.ts    # Repository interface
│   │    ├── producer.repository.ts              # Repository
│   │    ├── producer.router.ts                  # Router
│   │    ├── producer.service.interface.ts       # Service (use-case) interface
│   │    ├── producer.service.ts                 # Service (use-case)
│   │    └── producer.symbols.ts                 # Symbols for dependency injection
│   │    └── producer.types.ts                   # Domain types
├── mocks/                      # Mocks to tests
├── shared/                     # Shared code
│   ├── app/                    # Container dependency injection
│   │   ├── app.container.ts    # App container modules register
│   │   └── app.router.ts       # Router register
│   │   └── index.ts            # Default file to export module
│   ├── errors/                 # Error Handler
│   │   └── app-error.ts
│   ├── interfaces/             # Shared interfaces
│   │   ├── container.interface.ts
│   │   ├── controller.interface.ts
│   │   ├── router.interface.ts
│   │   └── index.ts            # Default file to export module
│   ├── middlewares/            # Middlewares
│   │   └── error-handler.ts
│   └── providers/              # Shared Providers
│   │   └── database-provider/  # Database connection provider
│   │   │   ├── database-connection-provider.interface.ts # Database provider interface
│   │   │   ├── database-connection-provider.ts           # Database provier
│   │   ├── providers.container.ts                        # Providers container register
│   │   └── providers.symbols.ts                          # Symbols to register dependency injection
│   └── services/              # Shared Services
│   │   └── csv-reader/        # CSV Reader service
│   │   │   ├── csv-reader.service.interface.ts           # CSV Reader interface
│   │   │   ├── csv-reader.service.ts                     # CSV Reader service
│   │   ├── services.container.ts                         # Service container register
│   │   └── services.symbols.ts                           # Symbols to register dependency injection
├── server.ts                   # Server start
├── .gitignore                  # Ignored files to git repository
├── .nvmrc                      # NVM Node version
├── nodemon.json                # Nodemon start
├── package.json
├── package-lock.json
├── tsconfig.json                # TypeScript settings
├── vitest.config.mts            # Vitest settings
└── vitest.setup.ts             # Vitest setup to tests
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 21.x
- [npm](https://www.npmjs.com/) >= 10.x

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cordeirogustavo/raspberry-awards-api
   ```

2. Install dependency

   ```bash
   npm i
   ```

3. Run locally

   ```bash
   npm run dev
   ```

4. Run tests

   ```bash
   npm run test
   ```

5. Build
   ```bash
   npm run build
   ```