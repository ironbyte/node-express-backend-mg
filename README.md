# pp-node-backend-api

NodeJS/Express backend API

## REQUIREMENTS

### npmjs packages (must be installed globally)

* nodemon

### linux package(s)

* NodeJS ~v8.12.0 (Go to nodejs.org for installation instructions)
* MongoDB Community Edition (Go to https://docs.mongodb.com/manual/installation/ for installation instructions)

## SET UP AND START THE BACKEND SERVER

1. Open a terminal window
2. `npm install` (Install all necessary npmjs packages)
3. `cp .env.example .env`
4. `nano .env` (Configure .env)
5. `mongo` (Verify that MongoDB server is running on mongodb://127.0.0.1:27017)
6. `npm run start:dev` (Start the server on localhost:3000)
