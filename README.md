# DISADA API
bangkit-cloud-computing project is part of the DISADA application. This is an API build with the Hapi.js as web application framework and using Database PostgreSQL

## Technology
* Build with Hapi Js framework so that code can be easily modularized

## Database
* PostgreSQL

## Version
- NodeJS  **v14.21.3** .

## Run Locally
Clone this repository
```bash
https://github.com/disada-id/bangkit-cloud-computing.git
```

Go to the project directory
```bash
  cd bangkit-cloud-computing
```

Install dependencies

```bash
  npm i
```

Migrate

```bash
  npm run migrate-dev
```

Start the server

```bash
  npm run start-dev
```

## DISADA Endpoint API Reference
#### Users

```bash
endpoint /auth
```
|Endpoint              |Method               | Parameter          | Type     | Description                                   |
|:---------------------|:--------------------| :------------------| :------- | :---------------------------------------------|
| /sigin                |POST                 | `application/json` | `string` | This endpoint used for user login. Payload contains username and password field, you can fill of username with username or email, after you fill payload and send request to server, server will response 201. |
| /signup                |POST                  | `application/json` | `string` | This endpoint used for register, contains name, nohp, email and password after you fill payload and send request to server, server will response 201.  |