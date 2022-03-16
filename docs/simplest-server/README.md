# simplest server

___

```shell
mkdir -p ./simplest-server/public && cd simplest-server
```

```shell
npm install koorie
```

```shell
echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>simplest server</title></head><body><h1>Koorie is simple to set up!</h1></body></html>' > ./public/index.html
```

```shell
npx koorie --static-files=public --middleware=without
```

> koorie your browsers @ http://localhost:3001/index.html

## simple as drinking a glass of water 🜄
