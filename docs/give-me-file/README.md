# give me file

___

###### handle GET request and download file

###### using koorie-shell hot wired tutorial ;)


### using 'git clone sparse-checkout' require git v2.19

```shell
git clone --no-checkout --filter=tree:0 https://github.com/simonedelpopolo/koorie
```

```shell
cd koorie && git sparse-checkout set docs/give-me-file
```

```shell
git checkout main && cd docs/give-me-file
```

```shell
npm install 
```

➡︎ [jump step by step](#check-it-out)

### step by step

___

**_a bit of command line_**

```shell
mkdir -p ./give-me-file/public && cd give-me-file
```

```shell
npm install koorie
```

```shell
mkdir -p routes/index && touch ./middleware.js ./routes/index/route.js
```

```shell
echo 'give me file! alright!' > public/alright
```

```shell
echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>give me file</title></head><body><h1>Koorie is simple to set up :D!</h1></body></html>' > ./public/index.html
```

___

**_working on files_**

filename `./package.json`

❗️ Open the `package.json` file and add the property `"type":"module"` and save it.

___

filename `./middleware.js`

```javascript
import { routes_inject, routes_set } from 'koorie'

export default async () => {
	
    // Object [ koorie.routes.inject ] will push into Object [ koorie.routes.collection ]
    // the route property set to an empty string will answer to http://localhost:3001
    // the asyncFunction property will import dynamically the route index
    // these two properties are required
    // routes always declared as async function returning an Answer
    // the incoming property should be set if the route responds to a GET|POST|PUT|DELETE request
    // in this case it will answer at http://localhost:3001 and the request will be GET [?give_me_file=alright]
    // the incoming property must be set to 'give_me_file'
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'give_me_file'  } )
    
    // Object [ koorie.routes.set ] will do type check of the given object to routes_inject() and registering the route inside Object [ koorie.routes.injected ]
    await routes_set()
}

```

___

filename `./routes/index/route.js`

```javascript
import {Answer} from 'koorie'
import {readFile} from 'node:fs/promises'
/**
 * Route (- index) - The simplest way to serve a route.
 * It is required to be an async function.
 * It is required to return an Answer.
 *
 * It accept two arguments but none of them is a required argument.
 *
 * arguments passed to the route by Object [ koorie.routing ] :
 *
 * - Server.IncomingMessage
 * - Server.ServerResponse
 *
 * Object Answer extends Promise so it works the same way.
 * Methods available in Answer
 *
 * - Answer.toGet(URLSearchParams{Answer.getQuestion('params')}, route{string}) - it handles the GET request method.
 * - Answer.toPost(Buffer{Answer.getQuestion('body')}, route{string}) - it handles the POST request method.
 * - Answer.getQuestion('body | params') - it returns a Buffer from IncomingMessage[body] OR the URLSearchParams Object
 * - Answer.clearQuestion() - It sets to null the body OR params received from the request.
 *
 * It depends on the constructed logic if it resolves or rejects.
 * @param {IncomingMessage} incoming
 * @param {ServerResponse} outgoing
 * @returns {Promise<Buffer>|Buffer}
 */
export async function index(incoming, outgoing){
    
    if(incoming.method === 'GET'){
        
        let error = false
        let give_me_file
        let buffer
        
        give_me_file = await Answer.toGet( await Answer.getQuestion('params'), 'give_me_file' )
        await Answer.clearQuestion()
    
        if( typeof give_me_file.empty !== 'undefined' ) {
            const message = await readFile(process.cwd() + '/public/index.html')
                //catch error.message
                .catch(error => error.message.toBuffer())
            outgoing.statusCode = 200
            outgoing.setHeader( 'content-type', 'text/html' )
        
            return Answer.resolve( message )
        }
        
        // this is internal check
        // Answer.toGet( URLSearchParams, path must coincide to the incoming property set in the middleware )
        // if it doesn't set status code 500 and that's it
        if( typeof give_me_file.invalid !== 'undefined'){
            error = true
            outgoing.statusMessage = 'internal_error'
            outgoing.statusCode = 500
            give_me_file = JSON.stringify(give_me_file).toBuffer()
        }
        else{
            if(give_me_file.has('give_me_file')) {
                
                if ( give_me_file.get( 'give_me_file' ) === 'alright' ) {
                    outgoing.statusMessage = 'oK'
                    outgoing.statusCode = 200
                    outgoing.setHeader( 'content-type', 'text' )
                    outgoing.setHeader( 'content-disposition', 'attachment; filename="alright"' )
                    buffer = await readFile( process.cwd() + '/public/alright' )
                } else {
                    error = true
                    outgoing.statusMessage = 'kO'
                    outgoing.statusCode = 404
                    give_me_file = JSON.stringify({ error: 'URLSearchParams not right' }).toBuffer()
                }
            }else {
                error = true
                outgoing.statusMessage = 'kO'
                outgoing.statusCode = 404
                give_me_file = JSON.stringify({ error: 'URLSearchParams not right' }).toBuffer()
            }
        }
        
        // obviously answers bad when it rejects :D
        return new Answer( (good, bad )=> {
            
            if(error)
                bad(give_me_file)
            
            good( buffer )
        } )
    
    }
}

```

___




#### check it out

```shell
npx koorie --static-files=public  --hot --socket='options(active:true|path:/tmp/koorie.sock)'
```


```shell

curl -verbose 'http://localhost:3001/?give_me_file=alright'

```
the response should be "give me file! alright!"


> koorie your browsers  
> 
> to download the file
>
> @ http://localhost:3001/?give_me_file=alright  
>
> You'll se the index.html rendered if you 
> @ http://localhost:3001/ OR  
> @ http://localhost:3001/index.html
>


**let the server up and running to try the socket functionality**

**first the hot wired functionality**  

**_edit filename `./routes/index/route.js`_**

- at line 42 change the content-type to application/json
- at line 43 replace message `const message = await readFile().....`  
  with `const message = JSON.stringify({hello:'folks'}).toBuffer()`

```javascript
//[.....]
/*line 42*/ outgoing.setHeader( 'content-type', 'application/json' )
/*line 43*/ const message = JSON.stringify({hello:'folks'}).toBuffer()
//[....]
```

**save the file.**

**open another terminal**

**remember to cd into where/ever/you/cloned/koorie/docs/give-me-file**  
**OR**  
**remember to cd into where/ever/you/have/started/step/by/step/give-me-file**


```shell
curl http://localhost:3001/

## should print '{hello:'folks'}'
```

**let's now play with koorie-shell**


**let's switch off the hot wired**
```shell
npx koorie-shell set --hot=false --socket-path=/tmp/koorie.sock
```
the output should look like this

```shell
receiving

single instance ➠ pid = [70791] received new set of options
the options will be applied without reloading the server ⬇︎
{"HOT":"false"}
closed
```

**_edit AGAIN filename `./routes/index/route.js`_**

- at line 43 replace message again  
  with `const message = JSON.stringify({goodnight:'folks'}).toBuffer()`

```javascript
//[.....]
/*line 43*/ const message = JSON.stringify({goodnight:'folks'}).toBuffer()
//[....]
```

**save the file.**

```shell
curl http://localhost:3001
```

isn't crazy the output?

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>give me file</title></head>
<body><h1>Koorie is simple to set up :D!</h1></body>
</html>
```

Not at all, because we have registered in the middleware, at the very beginning, our route that was reading the file index.html!!! so that function is still cached as it was in the original file!  
>As any other route changes we have done before turning of the hot wired functionality.  
> >but this is another story :)

now restart the server and check it out again :D

**_CTRL-C to shut down the server_**

```shell
npx koorie --static-files=public --socket='options(active:true:path:/tmp/koorie.sock)' --hot
## the response should be '{goodnight:'folks'}'
```

```shell
curl http://localhost:3001
```

### the response should be '{goodnight:'folks'}'

## simple as drinking a glass of water 🜄
