# message-node
Social app with NodeJS, MongoDB and ReactJS 

# Development

## Backend

Move to the *backend* folder to use or work on this part of the project.

### Install dependencies
```
npm install
```

### Start

Replace or modify the **mongoose** connect string in the *app.js* file. The current string is `mongodb+srv://marek:${process.env.MONGO_ATLAS_PWD}@cluster0-ewnnr.mongodb.net/message?retryWrites=true`

Then execute:

```
npm run start 
```

The backend will be run locally on address of http://localhost:8080

## Frontend

Open the project in new terminal window and move to the *frontend* folder to use or work on this part of the project.

### Install dependencies
```
npm install
```

### Start 

```
npm run start 
```
After running the project just open your browser and go to http://localhost:3000

### Testing

Run integration tests by

```
npm run test:watch
```
