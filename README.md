## At first we should create our projects folder then open the project in terminal, and follow this steps:

### Step 1: Creating a package.json file

```
npm init
```

Here, we are asking some question we can go thorough with hit enter in every question but for entry point will be: ./dist/server.js. Or we can simply use this command:

```
npm init -y
```

### Step 2: Install express, mongoose, cors, dotenv, typescript - devDependencies

```
npm install express
```

```
npm install mongoose --save
```

```
npm i cors
```

```
npm i dotenv
```

Install all of these dependencies in one command:

```
npm install express mongoose cors dotenv
```

And install typescript as devDependencies

```
npm install typescript --save-dev
```

Create a typescript configuration file:

```
tsc --init
```

if `tsc --init` is not working then follow these command first:

```
npm i -g typescript
```

Now go to tsconfig.json file and change these line:

```
"target": "es2016",
```

```
"rootDir": "./src",
```

```
"outDir": "./dist",
```

Then install type definition:

```
npm i --save-dev @type/node
```

```
npm i --save-dev @type/express
```

### Create a src/app.ts:

```
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Your server is running and hit the / route!',
  })
}

app.get('/', getAController)

export default app
```

### Create src/app/config/index.ts:

```
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
}
```

### Create a src/server.ts file:

```
import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
```

For run development application server:

```
npm i ts-node-dev --save-dev
```

### Add this in package.json

```
"scripts": {
  "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server",
  "build": "tsc",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Summary of the above step:

Our main function call from server.ts file and it connect with our database and listen the app.ts. For organize credential of config file we create a index.ts file in src/app/config/index.ts and define all of the credential.

### setup typescript, eslint and prettier:

Add these line tsconfig.json

```
"include": ["src"], // which files to compile
"exclude": ["node_modules"],
```

Installing eslint:

```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

Eslint initialization:

```
npx eslint --init
```

Installing Prettier:

```
npm install --save-dev prettier
```
