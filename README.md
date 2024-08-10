## Frontend - https://github.com/brooktewabe/Book-Rent-React

To create admin account
POST - localhost:5000/profile/signup

{
    "email":"admin3@example.com",
    "password":"password",
    "location": "Addis Ababa",
    "phoneNo":"0919191919",
    "role":"admin"
}

Demo accounts already created in the DB

email: owner1@example.com        password: password
email: owner2@example.com        password: password
email: admin1@example.com        password: password


To import database:

psql -h localhost -d bookdb -U postgres -f bookdb.sql

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
