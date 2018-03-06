# Project Name

> Project description

## Related Projects

  - https://github.com/MiNKS-HR/upcoming-availability-service
  - https://github.com/MiNKS-HR/ilias-similar-listings-service
  - https://github.com/MiNKS-HR/details-service
  - https://github.com/MiNKS-HR/photo-gallery

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

##Run in Production

From within the root directory

1) run a mongoDB instance
2)
```sh
npm run-script build
```
3) In a new terminal window
```sh
npm run-script seed-DB
npm run-script start
```

## Run in Development

From within the root directory

1) run a mongoDB instance
2)
```sh
npm run-script react-dev
```
3) In a new terminal window
```sh
npm run-script seed-DB
npm run-script start-dev
```

