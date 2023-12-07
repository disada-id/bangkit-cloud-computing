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


## Structure Project
```plaintext
bangkit-cloud-computing
├── node_modules
├── src
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── babycrydetection
│   │   │   ├── index.js
│   │   │   ├── handler.js
│   │   │   └── routes.js
│   │   ├── user
│   │   │   ├── index.js
│   │   │   ├── handler.js
│   │   │   └── routes.js
│   ├── exceptions
│   │   ├── AuthenticationError.js
│   │   ├── ClientError.js
│   │   ├── InvariantError.js
│   │   └── NotFoundError.js
│   ├── helpers
│   │   ├── database.js
│   │   └── middleware.js
│   ├── migrations
│   │   └── 20231203110811-users.js
│   ├── models
│   │   ├── index.js
│   │   └── users.js
│   ├── seeders
│   │   └── users.js
│   ├── services
│   │   └── user.js
│   └── index.js
├── .env (need configurations manually for security)
├── .eslintrc.json
├── .gitignore
├── .sequelizerc
├── package-lock.json
└── package.json
```

## Run Locally
Requirements Download and Installing Mandatory
* [PostgreSQL v16.1 Windows-64.exe](https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe)
* [Python v3.8.0 for env (@tensorflow/tfjs)](https://www.python.org/ftp/python/3.8.0/python-3.8.0-amd64.exe)
* [Visual Studio Installer for env (@tensorflow/tfjs)](https://download.visualstudio.microsoft.com/download/pr/63b5064f-af60-4cbe-96cd-a9dd9d41ee3d/92559de62c05423d5cafd06fd34c35e51199b1a90f34284abbe5b1d6fb75342d/vs_BuildTools.exe)
* [Microsoft Visual C++ Redistributable for env (@tensorflow/tfjs)](https://download.visualstudio.microsoft.com/download/pr/a061be25-c14a-489a-8c7c-bb72adfb3cab/4DFE83C91124CD542F4222FE2C396CABEAC617BB6F59BDCBDF89FD6F0DF0A32F/VC_redist.x64.exe)

Clone this repository
```bash
https://github.com/disada-id/bangkit-cloud-computing.git
```

After cloning the repo, request an .env configuration to [@albimdkr](https://github.com/albimdkr)

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