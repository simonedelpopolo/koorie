# simplest server with one root

___

###### In this example we see how to redirect a route to http://localhost:3001/


### using 'git clone sparse-checkout' require git v2.19

```shell
git clone --no-checkout --filter=tree:0 https://github.com/simonedelpopolo/koorie
```

```shell
cd koorie && git sparse-checkout set docs/simplest-server-one-route
```

```shell
git checkout main && cd docs/simplest-server-one-route
```

```shell
npm install
```

```shell
npx koorie --static-files=public --library=static
```

➡︎ [jump step by step](#check-it-out)

### step by step

___

```shell
mkdir -p ./simplest-server-one-route/public && cd simplest-server-one-route
```

```shell
npm install koorie
```

```shell
echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>simplest server one route</title></head><body><h1>Koorie is simple to set up redirection routes!</h1></body></html>' > ./public/index.html
```

filename ./package.json

❗️ Open the package.json file and add the property "type":"module" and save it.

```shell
touch middleware.js
```

**_edit the middleware.js file as shown below._**
```javascript
import { Answer, routes_set, routes_inject } from 'koorie'

//
/**
 * this redirect route handles when browsing at http://localhost:3001/root_index
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
const index_html = async (incoming, outgoing) => {
    
    outgoing.statusCode = 302;
    outgoing.setHeader('Location', '/');
    const message = Buffer.from( JSON.stringify({redirect: 'remember, koorie is simple.'}) )
    
    return Answer.resolve(message)
}

export default async ()=>{
    // inject the route to be injected?
    await routes_inject({ route:'root_index', asyncFunction: index_html  })
    await routes_set()
}
```

```shell
npx koorie --static-files=public --library=static
```

#### check it out

> koorie your browsers  
> @ http://localhost:3001/ OR  
> @ http://localhost:3001/index.html OR  
> @ http://localhost:3001/root_index
> 
> You'll se the same index.html rendered.

**check the response if you curl at it ;)**
```shell
curl -v 'http://localhost:3001/root_index'
```

the response should look something similar

```shell
*   Trying 127.0.0.1:3001...
* Connected to localhost (127.0.0.1) port 3001 (#0)
> GET /root_index HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/7.77.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 302 Found
< Location: /
< Date: Wed, 16 Mar 2022 10:14:32 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{"redirect":"remember, koorie is simple."}⏎ 
```

## simple as drinking a glass of water 🜄
