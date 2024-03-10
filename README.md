## Home Library Service

### Installation

**!!! Use Node.js LTS version !!!** 
- Clone this repository 
- Install npm modules: `npm install`
- Copy `.env.example` file to `.env`

### Running application

#### Dev mode

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.

#### Dev mode with watch

```
npm run start:dev
```

#### Dev mode with watch & debug

```
npm run start:debug
```

#### Build app for prod mode

```
npm run build
```

#### Prod mode

```
npm run start:prod
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

