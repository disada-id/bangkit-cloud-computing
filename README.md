# DISADA API
bangkit-cloud-computing project is part of the DISADA application. This is an API build with the Hapi.js as web application framework and using Database PostgreSQL

## Technology
* Build with Node.js and HapiJs framework so that code can be easily modularized

## Database
* [PostgreSQL v16.1](https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe)

## Version
- NodeJS  **v18.16.1**
- NPM **v9.5.1**
> Upgrade or Downgrade NodeJs using [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)


## Run Locally
Clone this repository
```bash
https://github.com/disada-id/bangkit-cloud-computing.git
```

Download and Installing PostgreSQL Database v16.1
* [PostgreSQL v16.1 Windows-64.exe](https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe)

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

Testing insert users to Database

```bash
  npm run seed-dev
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