```
npm init -y
```

```
npm install express
```

```
npm install mongoose --save
```

```
npm install typescript --save-dev
```

```
npm i cors
```

```
npm i dotenv
```

```
tsc -init
```

### Add this in package.json

```
"scripts": {
  "build": "tsc",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

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
