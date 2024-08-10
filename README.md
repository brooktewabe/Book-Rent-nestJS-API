## Frontend - https://github.com/brooktewabe/Book-Rent-React<br/>

To create admin account<br/>
POST - localhost:5000/profile/signup<br/>

{<br/>
    "email":"admin3@example.com",<br/>
    "password":"password",<br/>
    "location": "Addis Ababa",<br/>
    "phoneNo":"0919191919",<br/>
    "role":"admin"<br/>
}<br/>

Demo accounts already created in the DB<br/>

email: owner1@example.com        password: password<br/>
email: owner2@example.com        password: password<br/>
email: admin1@example.com        password: password<br/>


To import database:<br/>

psql -h localhost -d bookdb -U postgres -f bookdb.sql<br/>

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
