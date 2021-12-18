# Repository Tree Service

This repo is a TypeScript project (Node >= v14).

This service exposes a single route:
```
GET /repos-trees
```

# Running locally:
The service uses 2 env vars:

| Var | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **CLIENT_ID**              | Your GitHub client ID                                                            |
| **SECRET_KEY**              | Your GitHub access token            |

Please follow one of the options:
- **Using .env file** - Add a .env file to the root folder of the project
```
CLIENT_ID=<your_client_id>
SECRET_KEY=<your_access_token>
```
- **Using process.env** - Run the commands below in the terminal before running the service
```
export CLIENT_ID=<your_client_id>
export SECRET_KEY=<your_access_token>
```

For running the service please run the command:
```bash
npm install
npm start

# or for development
npm run start-dev
```

Please see the swagger for information of how to send a request
```bash
# curl example for a request
curl --location --request GET 'http://localhost:3000/repos-trees' \
--header 'owner_name: githubtraining' \
--header 'repository: hellogitworld'
```