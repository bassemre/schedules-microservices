# Scheduler Microservice

## Overview

The Scheduler Microservice is responsible for handling job scheduling while maintaining critical job-related information. It provides API endpoints to list, retrieve, and create scheduled jobs.

## Features

1. **Job Scheduling** - Supports flexible job scheduling configurations.
2. **API Endpoints**:
   - `GET /jobs` - Lists all scheduled jobs.
   - `GET /jobs/:id` - Retrieves job details by ID.
   - `POST /jobs` - Allows users to create new jobs with input validation.
3. **Database Integration** - Stores job details such as name, last run, next run, and scheduling attributes.
4. **Customization** - Allows users to define attributes, scheduling intervals, and execution settings.
5. **Scalability** - Handles ~10,000 users, ~1,000 services, and ~6,000 API requests per minute.

## Technology Stack

- **Language**: TypeScript
- **Framework**: Nest.js
- **Database**: PostgreSQL

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **PostgreSQL**
- **NestJS CLI**

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/scheduler-microservice.git
   cd scheduler-microservice
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (`.env` file):
   ```sh
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=password
   DATABASE_NAME=scheduler
   ```
4. Run database migrations (if needed):
   ```sh
   npm run migrate
   ```
5. Start the application:
   ```sh
   npm run start
   ```

## API Documentation

This service exposes the following endpoints:

### **GET /jobs**

Returns a list of all scheduled jobs.

#### Response:

```json
[
  {
    "id": 1,
    "name": "Send Email Notification",
    "status": "running",
    "interval": "5m",
    "lastRun": "2025-02-12T12:00:00Z",
    "nextRun": "2025-02-12T12:05:00Z"
  }
]
```

### **GET /jobs/:id**

Retrieves a specific job by ID.

#### Response:

```json
{
  "id": 1,
  "name": "Send Email Notification",
  "status": "running",
  "interval": "5m",
  "lastRun": "2025-02-12T12:00:00Z",
  "nextRun": "2025-02-12T12:05:00Z"
}
```

### **POST /jobs**

Creates a new scheduled job.

#### Request Body:

```json
{
  "name": "Send Email Notification",
  "interval": "5m"
}
```

#### Response:

```json
{
  "id": 2,
  "name": "Send Email Notification",
  "status": "pending",
  "interval": "5m",
  "lastRun": null,
  "nextRun": "2025-02-12T12:10:00Z"
}
```

## Best Practices

- Adheres to **SOLID principles**.
- Follows **modular architecture**.
- Optimized for **performance and scalability**.

## Contribution

Feel free to submit pull requests, open issues, and suggest improvements!

## License

MIT License. See `LICENSE` file for details.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
