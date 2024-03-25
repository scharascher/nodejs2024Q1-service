## Home Library Service

### Installation

**!!! Use Node.js LTS version !!!** 
1. Clone this repository 
2. Install npm modules: `npm install`
3. Copy `.env.example` file to `.env`
4. Install docker desktop if needed https://www.docker.com/products/docker-desktop/
5. Run app in a docker by running one of the commands:<br> - `npm run docker:start`<br> - `docker compose up --build`
6. After first run make a migration for database by running `npm run migrate:dev`
7. App is running and available by `http://localhost:4000`

### Scan images for vulnerabilities

```
npm run docker:scan
```

### Testing

**After application is running open new terminal and enter:**

To run all tests without authorization

```
npm run test
```

To run only specific test suite without authorization

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

**NOTE: authorization will be implemented later, in 3rd part of this task assignment**

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

