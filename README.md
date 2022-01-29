# Koorie

###### Node.js server.

___

## Index of Contents

- [Description](#description)
- [Installation](#installation)
- [The Koorie server library](#the-koorie-server-library)
  - [brief explanation of the Koorie server library flags](#brief-explanation-of-the-koorie-server-library-flags)
  - [Creating routes](#creating-routes)
    - [Route - post](#route---post)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

### Description



___

#### Installation

```shell

mkdir my-project
cd my-project

npm install koorie

touch index.js

```

> to use another port, set it in the webpack.dev.config.js, property devServer

- ### The Koorie server library

This is a personal experimental server to serve the React generated code.  
I have noticed a much better resource consumption, in terms of CPU and RAM by using a self-created library instead of using webpack serve function.  
In certain cases I saw a 70% less resource usage.
> ⚠ Consider this ABSOLUTELY not ready for production environment but try it out for testing and profiling.

> ℹ use it with production compiled React because it lacks of the socket connection to handle the hot and live reload provided by webpack devServer

- Spin up the Koorie server.
```shell 

npm run build-prod

node ./executable.js --port=3005 --address=localhost --cluster --static-files=public

```

> ℹ open the browser at http://localhost:3005

#### brief explanation of the Koorie server library flags

> ℹ only the --static-files is required, the others flags can be omitted. In this case the default port is `3000`, the address is `localhost` and the cluster in not called at all, and one `single` instance of the process runs.

- `--port[-p]=3005` - Sets the port to listen from
- `--address[-a]=localhost` - Sets the address to listen from
- `--cluster[-c]` - It forks the process for the half of the available CPUs
  - `--cluster=4` - It forks the process on 4 CPUs
  - `--cluster={"cpus":8,"init":"default"}`  - It accepts, at the moment, only two properties `{"cpus":{number},"init":"{string}"}`
    - `"cpus"` is the desired number of cpus.
    - `"init"` is the path to the file that will be executed during fork. "init":"default" loads the default file `./lib/serve/initialize.js`
    - read the docs at [Cluster | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/cluster.html#clustersetupprimarysettings)
- `--static-files[-s]=public` - This is a required argument, set it to `public` to serve the files located in the `public` directory or to anything else if required.

#### Creating routes

Koorie has a simple way to handle routes. Let's see how to add one, make a request and handle the response.

#### Route - `post`

filename `./routes/post/route.js`

```javascript
// Use any library you like for handling the json IncomingMessage and the ServerResponse.
// @react-dang/app has this module installed by default
import { is_json, parse } from 'json-swiss-knife'
// type checking
// @react-dang/app has this module installed by default
import { number_, undefined_ } from 'oftypes'

/**
 * Route (- post) - Pseudo post response.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @returns {Promise|PromiseFulfilledResult{object|Buffer}|PromiseRejectedResult{Buffer}}
 */
export async function message( incoming, outgoing ){

  let accepted = true
  let incomingBody

  // the method of the IncomingMessage MUST be POST to be accepted.
  if( incoming.method !== 'POST' )
    accepted = false
  else{
    const buffers = []

    // pushes the chunks into buffers[]
    for await ( const chunk of incoming )
      buffers.push( chunk )

    /**
     * cancat the chunks in the buffers.
     * @type {Buffer}
     */
    incomingBody = Buffer.concat( buffers )

    // ONLY JSON IncomingMessage is accepted 
    if( await is_json( incomingBody ) !== true )
      accepted = false
  }

  /**
   * Business Logic.
   * - Work with the incomingBody.
   * - Make a request to MongoDB to get the post.
   * - accepted?.
   * - response Object.
   */
  // if the 'incomingBody.post' property is undefined 'accepted' becomes false.
  if(await undefined_(incomigBody.post) === true)
      accepted = false
  else{
      // type checking for the incomingBody.post property
      // MUST be of type {number}
      if(await number_(incomingBody.post) === false)
          accepted = false
      else{
          // connect to MongoDB and retrieve the post
          
      }
     
  }
  
  // The routes return a Promise, ALWAYS!
  return new Promise( ( resolve, reject ) => {
    
    // proceed if it is accepted.
    if( accepted ) {
      // not required
      outgoing.statusCode = 200
      // not required
      outgoing.statusMessage = 'OK'
      // not required
      outgoing.setHeader( 'lightweight-api', 'true' )
      // not required but should be set for consistency.
      outgoing.setHeader( 'content-type', 'application/json' )
      
      const success = { message:'received' }

      resolve( {
        buffer: Buffer.from( JSON.stringify( success ) ),
        incoming:{
          length: Buffer.byteLength( incomingBody ),
          payload: incomingBody
        }
      } )
    }
    else {
      outgoing.statusCode = 404
      outgoing.statusMessage = 'Not Found'
      outgoing.setHeader( 'lightweight-api', 'false' )
      outgoing.setHeader( 'content-type', 'application/json' )

      const failed = { message: 'NOT OK' }

      reject( Buffer.from( JSON.stringify( failed ) ) )
    }

  } )
}

```
___

### JetBrains OSS License

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_
