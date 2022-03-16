# simplest server

___

###### the simplest ever


### using 'git clone sparse-checkout' require git v2.19

```shell
git clone --no-checkout --filter=tree:0 https://github.com/simonedelpopolo/koorie
```

```shell
cd koorie && git sparse-checkout set docs/simplest-server
```

```shell
git checkout main && cd docs/simplest-server
```

```shell
npm install koorie
```

```shell
npx koorie --static-files=public --middleware=without
```

➡︎ [jump step by step](#check-it-out)

### step by step

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

#### check it out

> koorie your browsers  
> @ http://localhost:3001/ OR  
> @ http://localhost:3001/index.html
>
> You'll se the same index.html rendered.

## simple as drinking a glass of water 🜄
