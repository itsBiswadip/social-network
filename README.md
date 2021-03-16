# Social-network
A simple cms to share posts, articles and thoughts.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)

## Installation
### Dependencies
The project has the following dependencies:

* Node.js: v12 (Minimum: v10)
* React.js: v17 (Minimum: v16.8)
* MySQL: v5.7

### Setup

1. Create a new databate in MySQL and add a `.env` in `src/backend` file with the following configuration:

```
DB_HOST=hostname
DB_USER=username
DB_PASSWORD=db_password
DB_DATABASE=database_name
``` 


2. Add a `.env` in `src/frontend` file with the backend api endpoint url.
Sample config is as follows:

```
REACT_APP_BASE_API_URL=http://localhost:3001
```

3. Run `npm run setup:backend` from project folder for initial backend setup

4. Run `npm run setup:frontend` from project folder for initial frontend setup

5. Run `npm start` from project folder to start backend server

6. Run `npm run start:frontend` from project folder to start frontend

## Usage

This repository is for demonstartion only. It's not suitable to use.

## Contributing

This repository is a demo and is not accepting contributions.