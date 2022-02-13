# Koorie

###### Node.js server. ESM Module asynchronous from the beginning of the Dreamtime.

___

## Index of Contents

- [Description](#description)
  - [The name Koorie](#the-name-koorie)
  - [Yet another NodeJS server](#yet-another-nodejs-server)
- [Installation](#installation)
  - [Koorie as Module](#koorie-as-module)
  - [Koorie global](#koorie-global)
- [Koorie library](#koorie-library)
  - [Koorie terminal flags](#koorie-terminal-flags)
    - [--port[-p]](#--port-p)
    - [--address[-a]](#--address-a)
    - [--react[-r]](#--react-r)
    - [--static-files[-s]](#--static-files-s)
    - [--domain[-d]](#--domain-d)
    - [--protocol[-l]](#--protocol-l)
    - [--cluster[-c]](#--cluster-c)
  - [Koorie-Shell commands and flags](#koorie-shell-commands-and-flags)
    - [Creating routes](#creating-routes)
      - [Route - post](#route---index)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

### Description

#### The name Koorie
Koorie borrows, with respect and admirance, its name from one of the Indigenous Australian clans so named Koori [Koorie].  
Their beliefs about the creation of the whole resides in the "Dreamtime" stories. Many of these stories are expressed by artists of this clan and many others.  
I intend to support the freedom and equality of tribes and indigenous humans all over the planet.  
This name is a tribute to all the highest thoughts of equality.

#### Yet another Node.js server

Here are we again?  
Nope, I wanted to understand the dynamics behind the more popular NodeJS servers around, like Fastify or Express just to cite some of them, and so I took a chance to develop one from scratch.  
How is going so far?  
One commit is alright the other one completely rewrite the app.  
:D Fun, a lot of fun.

### Installation

It is possible to install Koorie as a module dependency, or it is possible to install it globally.  
I'll go through both ways explaining some available commands in Koorie and Koorie-Shell.

___

#### Koorie as Module

```shell

# first make a directory and cd
mkdir my-stunning-server && cd my-stunning-server

# regular npm installation
npm install koorie

# once installed, runs 
npx koorie-shell init # this will setup few files to get you started.

# spin it up!
npx koorie 
# you'll be prompt to choose the root directory of the project as the 'public' directory
# make your choice

# open the browser at http://localhost:3001

```

#### Koorie global

```shell

# first make a directory and cd
mkdir my-stunning-server && cd my-stunning-server

# regular npm installation
npm install --global koorie

# once installed, runs 
koorie--shell init # this will setup few files to get you started.

# once created some files
# koorie-cli will look for a node_modules dir if not found will run 'npm install koorie'
# after that done, will edit the package.json file to make the project ready to be type:module.

# spin it up!
koorie --port=3847 --cluster

# you'll be prompt to choose the root directory of the project as the 'public' directory
# make your choice
# koorie will spawn processes for the half of the available CPUs

# open the browser at http://localhost:3847

```

However, Koorie is available globally, the project itself needs it as module dependency, so will be installed project scope anyway.

___

### Koorie library

___

This is a personal experimental server to serve React applications.  
I have noticed a much better resource consumption, in terms of CPU and RAM by using a self-written library instead of using webpack serve function.  
In certain cases I saw a 70% less resource usage.
> ⚠ Consider this ABSOLUTELY not ready for production environment but try it out for testing and profiling.

> ℹ use it with production compiled React because it lacks of the socket connection to handle the hot and live reload provided by webpack devServer

- Spin up Koorie.
```shell

npm install koorie
npx koorie-shell init
npx koorie --port=3005 --address=localhost --cluster --static-files=public
# --cluster will fork processes for the half of the available CPUs.
# if no public directory is found in the root directory of the project.
# the process will exit with error.

```

> ℹ open the browser at http://localhost:3005

___

#### Koorie terminal flags.

___

| flags                         | description                                                                                                                             | simple usage              |
|:------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|:--------------------------|
| --port[-p]={number}-{void}    | Sets the port to listen from. Default set to 3001. If no value has passed will set a random port.                                       | `npx koorie -p=3028`      |
| --address[-a]={string}        | Sets the address to listen from. Default set to localhost.                                                                              | `npx koorie -a=localhost` |
| --react[-r]={void}            | It tells to Koorie to expect a React application. <br/>Koorie will look for an index.html file under the `public` directory.            | `npx koorie --react`      |
| --static-files[-s]={string}   | It tells to Koorie to serve the files located in the specified directory. It is required flag to skip the [question](#--static-files-s) | `npx koorie -s=public`    |
| --domain[-d]={string}         | Default is set to the --address value. Road map -> kind of proxy server?                                                                | `npx koorie -d=localhost` |
| --protocol[-l]={string}       | Default is set to `http`. Road map -> to spawn an https server                                                                          | `npx koorie -l=https`     |
| --cluster[-c]={void}-{number} | When {void} it forks the process for the half of the available CPUs. Detailed at [cluster](#--cluster-c)                                | `npx koorie --cluster`    |

> ℹ If all the flags are omitted the default port is `3001`, the address is `localhost` and only a `single` instance of the process will run.

___

- ##### --port[-p]

  - --port[-p] -> It will listen on a random port.
  - --port[-p]=4789 -> It will listen on port 4789.
  - --port[-p]=foo -> process exits with errors.

___

- ##### --address[-a]

  - --address[-a]=192.168.1.1 -> It will listen on the specified IP address.

___

- ##### --react[-r]

  - --react[-r] -> It tells to Koorie to expect a React application. Koorie will look for an index.html file under the `public` directory.
  - --react[-r]=4789 -> process exits with errors.
  - --react[-r]=app -> process exits with errors.

___

- ##### --static-files[-s]

- --static-files[-s]=public -> It looks for a folder called public in the root directory of the project, no found process exits with error.
- --static-files[-s] -> It asks the below question.
  - public path is set to the root directory. is this fine? [yes|no]
  - answers: `yes|no OR y|n`
    - yes - The process will proceed showing a warning in the console that the `public` directory is set to the root directory of the project. Koorie will look "here" for files requested at the server. Not that safe right?
    - no - It will ask to specify a directory.
  - --static-files=28 -> process exits with errors.

___

- ##### --domain[-d]

  - --domain[-d]='www.example.com' -> Default set to process.env.address. _*RoadMap*_ -> kind of proxy server?

___

- ##### --protocol[-l]
  - --protocol[-l]=http -> Default is set to `http`. Road map -> to spawn a https server

___

- ##### --cluster[-c]

  - --cluster[-c]=4 -> It forks the process on 4 CPUs.
  - --cluster[-c] -> It forks processes for the half of the available CPUs
  - --cluster[-c]=foo -> process exits with errors.

___

#### Koorie-Shell commands and flags

| commands | flags                         | description                                                                                                                   | simple usage |
|:---------|:------------------------------|:------------------------------------------------------------------------------------------------------------------------------|:-------------|
| init     | --middleware[-m]={string}     | Default set to 'middleware[.js]'. It sets the filename (extension can be omitted) where the middleware function are imported. |              |          
|          | --project-name[-pn]={string}  | Default set to null. It sets the name property of the package.json                                                            |              |     
|          | --description[-d]={string}    | Default set to null. It sets the description property of the package.json                                                     |              |
|          | --license[-l]={string}        | Default set to null. It sets the license property of the package.json                                                         |              |
|          | --author[-a]={string}         | Default set to null. It sets the author property of the package.json                                                          |              |
|          | --version[-o]={semver-string} | Default set to 0.0.1. It sets the version property of the package.json                                                        |              |
|          | --react-dang[-rd]={string}    |                                                                                                                               |              |
| route    | --add[-a]={JSON}              | Add a basic route                                                                                                             |              |
|          | --edit[-e]={JSON}             | Edit a route                                                                                                                  |              |
|          | --delete[-d]={JSON}           | Delete a route                                                                                                                |              |

___

- ##### init

  - ##### --middleware[-m]
  - ##### --

- ##### route

  - ##### --add[-a]

  - ##### --edit[-e]

  - ##### --delete[-d]

#### Creating routes

Koorie has a simple interface for creating routes and handle them.  
Small guide step by step:

- Server from scratch.
  - server without using `npx koorie-shell init` command.
  - add the middleware handler.
  - add one route named index that serve the http://localhost:3500
  - make a request and get the response.

#### Route - `index`

`mkdir s-scratch && cd s-scratch && npm install koorie`

Open the 'package.json' file and add the property "type":"module" save it.

`mkdir -p routes/index`   
`touch ./middleware.js ./routes/index/route.js`

filename `./middleware.js`

```javascript
import { routes } from 'koorie'

export default async () => {
	
    // koorie.routes is an object 'container' 
	// the route property set to an empty string will answer to http://localhost:3001
    // the asyncFunction property will import dynamically the route index
    // these two properties are required
    // routes always declared as async function returning a Promise
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    
    // the koorie.routes.set() will do type checking of the given object.
    await routes.set()
}

```

filename `./routes/index/route.js`

```javascript
/**
 * Route (- index) - The simplest way to serve a route.
 * It is required to be an async function.
 * It is required to return a Promise.
 *
 * It accept three arguments but none of the is a requires argument.
 * 
 * arguments passed to the route by the koorie.routing :
 *
 * - Server.IncomingMessage or the request.
 * - Server.ServerResponse or response.
 * - koorie.query koorie.body
 * 
 * It depends by the constructed logic if resolve or reject. 
 * In this simple case always resolve with a buffer.
 * The buffer is returned to the koorie.routing and finally to koorie.outgoing.
 *
 * @returns {PromiseFulfilledResult{Buffer}}
 */
export async function index(){
    
    return Promise( resolve => {
        
        resolve(Buffer.from(JSON.stringify({'index-route':'response'})))
    })
}

```

spin up the server.

`npx koorie --port=3500 --address=localhost --cluster`

```shell

curl -verbose http://localhost:3500 | jq 
# 'jq' is a small utility that formats json string in the terminal.
# request/response header shows because of the -verbose flag passed to curl
# the response should be {"index-route":"response"}

```

keep on doing requests while having a look at log of the server and see which of the workers is handling the request/response

_*RoadMap*_ flag that set the logger to be silent, or to print, or to save to a log file. koorie.logger is the Object that logs.

___

### JetBrains OSS License

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_

