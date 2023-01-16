### Description
This project contains simple CRUD API with in-memory database underneath

### Download
To download this application run the command
https://github.com/antontrafimovich/crud-api.git
then switch to the `dev` branch


### Installation
To install this application go to the project root and run next command
> npm install

To install and run this application you should have preinstalled Node JS (at least v18.12.1) and npm (at least v8.19.2). To install

### Running
Application is being run only from the root folder using following commands:
- `npm run start:dev` which runs the app in **dev** mode
- `npm run start:prod` which runs the app in **prod** mode
- `npm run start:multi` which runs the app in **multi** mode

Each mode has its own features:
 - **dev mode** - the application is run in development mode using nodemon, which will automatically restart the app when the source code is changed. Used for development.
 - **prod mode** - the application is run in production mode. The command, which run application in this mode, starts the build process and then runs the bundled file.
 - **multi mode** - this command scales application horizontally by running several Node JS instances.


------------



 Also the application takes PORT as a parameter provided with .env file (for convenience you can rename .example.env file to .env and provide PORT value). Note that PORT can take only integers.

### Using
There's an implemented `api/users` endpoint, which takes next commands:
- **GET** `api/users` is used to get all persons
 - Server should answer with `status code` **200** and all users records
- **GET**  `api/users/{userId}` returns user by userId
- **POST** `api/users` is used to create record about new user and store it in database. Params name, age and hobbies are required. Name must be string, age must be a number and hobbies must be an array of strings;
- **PUT**  `api/users/{userId}` is used to update existing user. Params name, age and hobbies are required. Name must be string, age must be a number and hobbies must be an array of strings;
- **DELETE** ` api/users/{userId}` is used to delete existing user from database