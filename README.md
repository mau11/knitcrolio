# knitcrolio 🧶

> A cozy dashboard to track your knitting and crochet projects.

## Table of Contents

1. [Tech Stack](#tech-stack)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Set up database](#set-up-database)
   1. [Running the Server](#running-the-server)
1. [Contributing](#contributing)
1. [License](#license)

## Tech Stack

- **React**: A JavaScript library for building user interfaces, used as the foundation of the frontend.
- **Next.js**: React-based framework for building the frontend and handling server-side logic.
- **TypeScript**: A superset of JavaScript that provides static types and ensures safer, more maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive, modern interfaces.
- **PostgreSQL**: Relational database for storing yarn stash and project data.
- **Prisma**: ORM for interacting with PostgreSQL in a type-safe manner.

## Requirements

- Node v22.14.0
- pnpm v10.10.0

## Development

#### Installing Dependencies

From within the root directory:

```sh
$ nvm use
$ pnpm install
```

#### Set up database

Log into postgres and create new database (replace username with your db username and password with your desired db password):

```
$ psql postgres
postgres=# CREATE DATABASE knitcrolio;
postgres=# \c knitcrolio
knitcrolio=# ALTER USER username WITH PASSWORD 'password';
```

Run the following after making any changes to the schema:

```sh
$ pnpm prisma generate
```

#### Running the Server

Once dependencies are installed, run the following command to start the development server:

```sh
$ pnpm dev
```

Your application will be available at http://localhost:3000.

## Contributing

Contributions are always welcome! Whether it's fixing bugs, improving features, or suggesting new ones, feel free to open an issue or submit a pull request.

There isn't a formal contribution guide at the moment, but one will be created when needed. Please ensure that your contributions align with the project’s goals and respect the licensing terms.

## License

![License: Custom Non-Commercial](https://img.shields.io/badge/license-non--commercial-lightgrey.svg)

This project is open-source under a custom **Non-Commercial License**. You may view, fork, and contribute to this project for personal and non-commercial use only. Commercial use, redistribution, or hosting of this project or its derivatives for profit (including ads, paid access, or donations) is not permitted without explicit written permission from the author.

See [LICENSE.txt](./LICENSE.txt) for full terms.
