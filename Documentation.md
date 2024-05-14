# Cyber-Wallet

## Getting Started

The following steps are to be followed to set up the web server locally

- Run `npm install` to install the required dependencies
- Create a .env file, copy the content of .env.example file and replace the placeholders accordingly
- Provided that a database is already in place and its name is included in the .env file in the step above, run the command below to start the server.

  `npm run start:dev`

## API Reference/Documentation

- Baseurl: http://localhost:3000/
- SwaggerUI url: http://localhost:3000/api

---

## NOTE: API can also be tested right on the swaggerUI interface

### Error Handling

Error responses are returned in the format below

```
{
  "success": false,
  "status": "Short error message",
  "message": "Detailed error message"
}
```

The API will return these error types when requests fail:

- 400: Bad Request
- 404: Resource Not Found
- 409: Conflict Operation
- 500: Internal Server Error

---

### Endpoints

#### POST `/users`

- General

  - Creates a new user
  - Creates a wallet for the user as well
  - Request Arguments: None

- Sample Request:

```json
POST https://localhost:300/users
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@gmail.com",
  "address": "Lane 5, Ikeja GRA",
  "transactionPin": "1234"
}
```

- Sample Response:

```json
{
  "id": 4,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@gmail.com",
  "address": "Lane 5, Ikeja GRA",
  "wallet": {
    "id": 4,
    "userId": 4,
    "balance": 0,
    "transactionPin": "$2b$10$yLg8no58g7kblzX.E1yiBOanzYuGz.FaZ5nByNEZ/igxgqGJMpNGu"
  }
}
```

### Endpoints

#### POST `/transaction`

- General

  - Creates a new transaction record
  - Debits the senders wallet
  - Credits the beneficiary's wallet
  - Request Arguments: None

- Sample Request:

```json
POST https://localhost:300/transaction
Content-Type: application/json

{
  "userId": 3,
  "amount": 1000,
  "beneficiarryWalletId": 4,
  "transactionPin": "1234"
}
```

- Sample Response:

```json
{
  "id": 2,
  "reference": "9f44aa55-98d9-47d1-a904-5585a56e123e",
  "userId": 3,
  "amount": 1000,
  "walletId": 4
}
```
