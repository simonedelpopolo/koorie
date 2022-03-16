# Koorie

___

###### Node.js server. ESModule asynchronous from the beginning of the Dreamtime.

> ⚠ Consider this package ABSOLUTELY not ready for production environment but try it out for testing and profiling or dev server not exposed to public.
>
> ⚠ `v1.6.x-experimental` shall be considered unstable like hell. but it works.
>
> ⚠ the flags=options are always under refactoring mode.
>
> ⚠ ❗️ the short flags are NOW removed.
>
> ⚠ This software won't run on Windows.

___

## Index of Contents

___

- [Description](#description)
  - [The name Koorie](#the-name-koorie)
  - [Yet another NodeJS server](#yet-another-nodejs-server)
  - [Design](#design)
    - [executable interfaces](#executable-interfaces-)
    - [socket whispered](#socket-whispered-)
    - [hot wired](#hot-wired-)
    - [forked state](#forked-state-)
    - [middle routes](#middle-routes-)
    - [ejected state](#ejected-state-)
  - [EXAMPLES](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md)
- [Installation](#installation)
  - [Koorie as Module](#koorie-as-module)
  - [Koorie global](#koorie-global)
- [Koorie library](#koorie-library)
  - [Koorie server configuration file](#koorie-server-configuration-file)
  - [Koorie terminal flags](#koorie-terminal-flags)
    - [--address](#--address)
    - [--cluster](#--cluster)
    - [--ejected](#--ejected)
    - [--hot](#--hot)
    - [--library](#--library)
    - [--logger](#--logger)
    - [--middleware](#--middleware)
    - [--port](#--port)
    - [--secure](#--secure)
    - [--socket](#--socket)
    - [--static-files](#--static-files)
  - [Koorie-Shell commands and flags](#koorie-shell-commands-and-flags)
    - [init command](#init-command)
      - [--bare](#--bare)
      - [--author](#--author)
      - [--description](#--description)
      - [--license](#--license)
      - [--middleware](#--middleware_)
      - [--name](#--name)
      - [--version](#--version)
    - [ssl command](#ssl-command)
      - [--generate](#--generate)
    - [route command](#route-command--this-command-it-not-available-yet-consider-this-section-an-idea-on-how-could-be)
      - [--add](#--add)
      - [--edit](#--edit)
      - [--delete](#--delete)
    - [koorie-shell socket connection to koorie API](#koorie-shell-socket-connection-to-koorie-api)
    - [--socket-path](#--socket-path)
      - [set command](#set-command)
        - [--hot](#--hot_)
      - [performance command](#performance-command)
        - [--refresh-rate](#--refresh-rate)
    - [Creating routes](#creating-routes)
      - [Route - index](#route---index)
- [Diagrams](https://github.com/simonedelpopolo/koorie/blob/main/docs/DIAGRAMS.md)
  - [1. changing options on the fly through socket](https://github.com/simonedelpopolo/koorie/blob/main/docs/DIAGRAMS.md#1-changing-options-on-the-fly-through-socket)
  - [2. performance lookup](https://github.com/simonedelpopolo/koorie/blob/main/docs/DIAGRAMS.md#2-performance-lookup)
- [Road Map](#road-map)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

## Description

___

### The name Koorie

Koorie borrows, with respect and admirance, its name from one of the Indigenous Australian clans so named Koorie.  
Their beliefs about the creation of the whole resides in the "Dreamtime" stories. Many of these stories are expressed by
artists of this clan and many others.  
I intend to support the freedom and equality of tribes and indigenous humans all over the planet.  
This name is a tribute to all the highest thoughts of equality.

___

### Yet another Node.js server

Here are we again?  
Nope, I wanted to understand the dynamics behind the more popular NodeJS servers around, like Fastify or Express just to
cite some of them, and so I took a chance to develop one from scratch.  
How is going so far?  
One commit is alright the other one completely rewrite the app.  
Fun, a lot of fun.

___

### Design

___

When installed, koorie comes with two executable interfaces ⎔, a socket interface ⌖, editing of routes without restarting the server to see the changes ♨, cluster the server into many processes as many CPUs available ⑂, middleware routes ↬, and last but not least, designing your own server without using the koorie executable file to spinning it up ⏏.  

#### executable interfaces ⎔

___

- **_koorie_** is the spinning server up executable. Many options can be given to the command line to start up server/s in seconds.  
  It requires just your HTML, CSS and JavaScript and `0` configuration to run your application.  
  It can be more complex than this, but once the options are given to the command line there is `0` configuration files to write down.

- **_koorie-shell_** is _"Santa's little helper"_. With this interface it's possible to:
  - initialize a basic server project with one middle route and all the required options.
  - initialize a basic ejected state server one middle route and all the required options. (not implemented yet)
  - generate SSL self-signed certificate.
  - create, add, edit routes. (not implemented yet)
  - observe socket whispered performance behaviour.
  - switch off hot wired option on the fly socket whispered.
  - injecting new routes without restarting the server. (not implemented yet)

___

#### socket whispered ⌖

___

It's possible to activate the socket interface to control, edit and check the server behaviour.  
This functionality should be given with the flag --socket='options(active:true|path:/path/to/file.sock)' during server start-up.

___

#### hot wired ♨︎

___

When activated, it will be possible to edit routes and see the changes without restarting the server.
Consider this a functionality that may be turned off in PRODUCTION exception done for small temporary emergency editing that may be fixed and deployed correctly next commit.  
It can be activated during start-up with the flag --hot or later socket whispered (it requires the server to have socket interface activated).

___

#### forked state ⑂

___

It is possible to fork the server into many processes as many CPUs available in the host OS  
To fork the process pass to the command line the flag --cluster. In this case will fork processes for the half of the CPUs available.
When forking in conjunctions with ejected state some configuration must be given to make it properly working. Examples ➡︎ [here]() 

___

#### middle routes ↬

___

Middleware are cool and koorie got you covered. Examples ➡︎ [here](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md) ⬇ [route- index](#route---index)
___

#### ejected state ⏏

___

Control on the code, configuration and personalization for a backend developer is a must.  
This functionality can be achieved using **koorie** or any other executable like **node**, **nodemon** and whatever it's the dev choice.  
Not rely on koorie executable is important when you want to build something different. Maybe a benchmarking testing suite? Who knows.  
However, it is here at your disposal.  
Examples ➡︎ [here]()

___

## Installation

___

It is possible to install Koorie as a module dependency, or it is possible to install it globally.  
I'll go through both ways explaining some available commands in Koorie and Koorie-Shell.

___

### Koorie as Module

```shell

# first make a directory and cd
mkdir my-stunning-server && cd my-stunning-server

# regular npm installation
npm install koorie

# once installed, run
npx koorie-shell init --bare # this will setup few files to get you started.

# at the prompt answer yes

# spin it up!
npx koorie 
# you'll be prompt to choose the root directory of the project as the 'public' directory
# at the prompt answer yes

# open the browser at http://localhost:3001

```

___

### Koorie global

```shell

# first make a directory and cd
mkdir my-stunning-server && cd my-stunning-server

# regular npm installation
npm install --global koorie

# once installed, no more `npx`
koorie-shell init --bare # this will setup few files to get you started.

# at the prompt answer yes

# spin it up!
koorie --port=3847 --cluster

# you'll be prompt to choose the root directory of the project as the 'public' directory
# at the prompt answer yes

# the flag --cluster will spawn processes for the half of the available CPUs

# open the browser at http://localhost:3847

```

However, Koorie is available globally, the project itself needs it as module dependency, so it will be installed project
scope anyway.

___

## Koorie library

___

### Koorie server configuration file

___

> ⚠ The server configuration file is an experimental feature. It works anyway.

> It is a draft (for fun basically) on how it can be the hypothetical server configuration file. by adding and setting a .koorierc file it is possible to run `npx koorie` ❗ without any flags.

> The Object [ config.parser ] looks for charCode = `32`, at position `0` of the next line read by node:readline interface, that, corresponds to one empty character ( one space ). In this case everything after the first space will be treated as a comment, so then skipped from being parsed.

- To set an option the flags available are going to be used, **_without the double prefixing hyphen_**.
- The `option` name must be followed by one empty character and the equal sign `=`
- The `=` must be followed by an empty character and a string representing the `value` assigned to the `option`.
- Number are parsed and given back as primitive type {number}.

filename -> `.koorierc` must be named like this and must reside in project root directory.

```text

; this is a comment and will be skipped by Object [ config.parser ]

; static_files = path/to/public
; will fail because the option (left operand) must be the same, without double hyphen prefixing, as the flag passed to the command line [--static-files]. ❗ ONLY use the long flags!

; I left the line below uncommented 
static-files = path/to/public
; will go through ;)

; static-files= path/to/public
; will fail because ❗ MUST be one empty character from the equal sign for both left operand and right operand!

```

___

### Koorie terminal flags.

> ⚠ BREAKING CHANGES **since** version 1.x.x.  
> when a flag, for both koorie & koorie-shell, requires key:value options, it must be supplied this way:  
> `npx koorie --logger='options(quiet:true:write:log.txt)'` ♥︎
> `npx koorie --logger='options(quiet:true|write:log.txt)'` ♥︎♥︎ **_this is more readable_**
>
> ℹ single quotes are required.
> ___
> ~~before version 1.x.x was supplied this way:  
> npx koorie --logger=quiet:true:write:log.txt~~ ♠︎♠︎
___

| flags                              | description                                                                               |
|:-----------------------------------|:------------------------------------------------------------------------------------------|
| --address={string}                 | Sets the address to listen from. Default set to localhost.                                |
| --cluster={void}-{number}          | When {void} it forks the process for the half of the available CPUs.                      |
| --ejected={string}                 | Sets startup file ejected from koorie.                                                    |
| --hot={boolean}-{void}             | Default is set to false. When {void} it sets hot wired                                    |
| --library={string}                 | It tells to Koorie to expect a javascript library application.                            |
| --logger={'options(option:value)'} | Default set to print to stdout every request.                                             |
| --middleware={string}              | Default set to none. If set to 'without' no middleware will be seeked.                    |
| --port={number}-{void}             | Sets the port to listen from. Default set to 3001. When {void} listen from a random port. |
| --secure={'options(option:value)'} | HTTPS server                                                                              |
| --socket={'options(option:value)'} | Default is off. Available options: [active:boolean] required. [path:string] required.     |
| --static-files={string}            | It tells to Koorie to serve the files located in the specified directory.                 |

> ℹ If all the flags are omitted the default port is `3001`, the address is `localhost` and only a `single` instance of the process will run.  
> and you'll be prompted to confirm the root of your project ad `public directory`.

___

- #### --address
  
  - `npx koorie --address=192.168.1.1` -> It will listen on the specified IP address.
  - Default set to `localhost`

___

- #### --cluster
  
  - `npx koorie --cluster=4` -> It forks the process on 4 CPUs.
  - `npx koorie --cluster` -> It forks processes for the half of the available CPUs
  - `npx koorie --cluster=foo` -> process exits with errors.
  - `npx koorie --cluster=full` -> It forks processes for all the available CPUs
  - Default set to half of the available CPUs.

___

- #### --ejected
  
  - `npx koorie --ejected=servers/ejected_a.js` -> It will load the file at the specified path.
  - ⬆︎ this example still call **_npx koorie_** to show the use of the flag --ejected.
  - `node servers/ejected_a.js && node servers/ejected_b.js`
  - ⬆︎ this example call **_node_** to load the server_a.js & servers/ejected_b.js examples ➡︎ [here](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md)

___

- #### --hot
  - `npx koorie --hot` -> it will hot wire koorie. so for every change done to the routes there will be no need to restart the
    server.
  - Default sets to false

___

- #### --library
  - ⚠ work in progress to differentiate frameworks
  - `npx koorie --library=react` -> It tells to Koorie to expect a React application. Koorie will look for an index.html file
    under the `public` directory.
  - `npx koorie --library=4789` -> process exits with errors.

___

- #### --logger
  
  - `npx koorie --logger='options(quiet:true:write:logger.log)'` -> it will silence the Object [ koorie.logger ], and it will
    save the log to a file named logger.log in the root directory of the project.
  - Defaults set to `quiet=false` `write=null`

___

- #### --middleware
  
  - `npx koorie --middleware=starter.js` -> it will look for a file named starter.js in the root directory of the project, and
  - `npx koorie --middleware=without` -> it will NOT look for any middleware file.
  - The middleware file is used to register all the available routes and the incoming REQUEST, if any, to the specified route.
  - Default set to `middleware.js`

___

- #### --port
  
  - `npx koorie --port` -> It will listen on a random port.
  - `npx koorie --port=4789` -> It will listen on port 4789.
  - `npx koorie --port=foo` -> process exits with errors.
  - Default set to `3001`

___

- #### --socket
  
  - `npx koorie --socket='options(active:true|path:/tmp/koorie.sock)'` -> it will open a socket at the specified path.
  - Defaults set to `active=false` `path=null`
  - Options are required. ⚠︎ combination active:false:path:/to/file.sock is not implemented yet.

___

- #### --secure
  
  - > _**to run HTTPS server it's necessary to obtain an SSL certificate.**_
    1. Using LetsEncrypt for production severs ➡︎ [LetsEncrypt](https://letsencrypt.org)
    2. Self-Signed certificates for (localhost)DEVELOPMENT or (trusted)PRIVATE_NETWORK ⬇︎
  
  - **_koorie-shell ssl --generate_** : generating self-signed certificate and dhparam (⚠︎ ︎DEVELOPMENT)
    ```shell
       # in the root directory of your project
    
       npx koorie-shell ssl --generate='options(path:certs|key:koorie.key.pem|cert:koorie.cert.pem|dhparam:koorie.dhparam.pem)'
    ```
      1. ⬆︎ a directory named `certs` will be made in the root of the project.
      2. a key named `koorie.key.pem` and a certificate named `koorie.cert.pem` will be placed in the `certs` directory.
      3. the process of generating the file `koorie.dhparam.pem` can take long time. once done will be placed in the `certs` directory.  
    **_koorie-shell will just use the command below, so, openssl is required to be available on the host OS_**
  
  - **_DoItYourself_** : generating self-signed certificate and dhparam with `openssl` (⚠︎ DEVELOPMENT):
    ```shell
       # in the root directory of your project
       mkdir certs && cd certs
    
       # ℹ the below command will generate a basic self-signed certificate expiring in 365 days
       #   without passphrase for the private key [-nodes] ❗️ NO PRODUCTION OR PRIVATE_NETWORK
       #   suppressed certificate questions [-subj '/CN=localhost']
       openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes -subj '/CN=localhost'
    
       # ℹ the below command will take some time.
       openssl dhparam -out dhparam.pem 2048
    ```
  - > **_--secure='options(active:true|key:certs/key.pem:cert:certs/cert.pem:dhparam:certs/dhparam.pem)'_**
    > 
    > it will spawn an HTTPS server.

  - Defaults set to `active=false` `key=null` `cert=null` `dhparam=null`
  - ❗️Required Options:
    - _**active**_ ➡︎ must be true
    - _**key**_ ➡︎ path to the key.pem file
    - _**cert**_ ➡︎ path to the cert.pem file
  - ❗NOT required -> _**dhparam**_ ➡︎ path to the dhparam.pem file

___

- #### --static-files

- `npx koorie --static-files=public`  
  It looks for a directory called `public` in the root directory of the project, no found
  process exits with error.
- `npx koorie --static-files` -> **_It asks the below question_**.
  - public path is set to the root directory. is this fine? [**yes** **|** **no**]
  - answers: `yes|no OR y|n`
    - yes - The process will proceed showing a warning in the console that the `public` directory is set to the root
      directory of the project. Koorie will look "here" for files requested at the server. Not that safe right?
    - no - It will ask to specify a directory.
  - `npx koorie --static-files=28` -> process exits with errors.
  - Default it will ask the above question.

___

### Koorie-Shell commands and flags

___

| commands    | flags                                       | description                                                      |
|:------------|:--------------------------------------------|:-----------------------------------------------------------------|
| init        | --bare={void}                               | Generates a project in current working directory ❗️ [overwrites] |
|             | --author={string}                           | Default set to null.                                             |
|             | --description={string}                      | Default set to null.                                             |
|             | --license={string}                          | Default set to null.                                             |
|             | --middleware={string}                       | Default set to 'middleware[.js]'.                                |
|             | --name={string}                             | Default set to null.                                             |
|             | --version={semver-string}                   | Default set to 0.0.1.                                            |
| route ❗️    | --add ❗️                                    | Add a basic route                                                |
|             | --delete ❗️                                 | Delete a route                                                   |
|             | --edit ❗️                                   | Edit a route                                                     |
| set         | --hot={boolean}                             | Switcher                                                         |
|             | --socket-path={string}                      | Path to koorie socket. required                                  |
| performance | --refresh-rate={number}                     | Stats refresh rate in milliseconds                               |
|             | --socket-path={string}                      | Path to koorie socket. required                                  |
| ssl         | --generate={'options(option:value)}-{void}' | Generates self-signed SSL certificate                            |

___

- #### init command
  
  - ##### --bare
    - `npx koorie-shell --bare`
    - using this flag will overwrite everything in the root directory of the project.  
      anyway it will be asked confirmation
  
  - ##### --author
    - `npx koorie-shell --author='John Doe'`
    - It sets the author property of the package.json
  
  - ##### --description
    - `npx koorie-shell init --description='my amazing project'`
    - It sets the description property of the package.json
  
  - ##### --license
    - `npx koorie-shell init --license=Apache2.0`
    - It sets the license property of the package.json
  
  - ##### --middleware_
    - `npx koorie-shell --middleware=starter.js`
    - It creates a middleware file named starter.js, and it set the npm script 'serve' to use this as default middleware
      loader.
  
  - ##### --name
    - `npx koorie-shell --name=my-amazing-project`
    - It sets the name property of the package.json
  
  - ##### --version
    - `npx koorie-shell --version=10.23.635`
    - It sets the version property of the package.json

- #### ssl command
  
  - ##### --generate
    - `npx koorie-shell --generate`
    - will generate an SSL self-signed certificate in the root directory of the project.  
      once generated **_./key.pem & ./cert.pem_**
    - `npx koorie --secure='options(active:true:key:key.pem:cert:cert.pem)`
    - ℹ **_available options for flag --generate. none of them are required_**
      - path:{string} ➡︎ absolute OR relative. if the path doesn't exist it will make it. if not given the path is process.cwd()
      - key:{string} ➡︎ the wished name for the key. the extension should be `.pem`
      - cert:{string} ➡︎ the wished name for the cert. the extension should be `.pem`
      - dhparam:{string} ➡︎ the wished name for the dhparam. the extension should be `.pem`

- #### route command ❗ this command it `NOT AVAILABLE` yet. Consider this section an idea on how could be.
  
  - ##### --add
    - `koorie-shell --add=dang`
    - It saves a route with name `dang` into the directory `./routes/dang/route.js`
    - It adds the route to the middleware.js file.
  
  - ##### --delete
    - `npx koorie-shell --delete=dang`
    - It deletes the route named `dang`
  
  - ##### --edit
    - `npx koorie-shell --edit=dang`
    - maybe open OS EDITOR ( vim, emacs ) and editing the file **_./routes/dang/route.js_**
    - or maybe injecting code into the route public object?

- #### koorie-shell socket connection to koorie API

- #### --socket-path
  
  - > all the commands, socket related, must explicit define the path to koorie socket file with the flag `--socket-path=/path/to/koorie.sock`

- #### set command
  
  - ##### --hot_
    - `npx koorie-shell set --hot=false --socket-path=/path/to/koorie.sock`
    - it will switch off the hot wired functionality. anytime a route has changes the server must be restarted to apply che changes.

- #### performance command
  
  - ##### --refresh-rate
    - `npx koorie-shell performance --refresh-rate=2000 --socket-path/path/to/koorie.sock`
    - it will stream every 2 seconds the process.memoryUsage object

___

### Creating routes

Koorie has a simple interface for creating routes and handle them.  
Small guide step by step:

- Server from scratch.
  - server without using ~~npx koorie-shell init~~ command.
  - add the middleware handler.
  - add one route named index that serve the http://localhost:3001
  - add a GET request handler
  - adding a `public` directory
  - add a static file to be read and send back.
  - make a request and get the response.
  - using `npx koorie-shell set --hot=false --socket-path=/tmp/koorie.sock` to check the socket functionality

#### Route - `index`

```shell

mkdir s-scratch && cd s-scratch && npm install koorie
mkdir -p routes/index && touch ./middleware.js ./routes/index/route.js
mkdir public` && `echo 'give me file! alright!' > public/alright

```

filename `./package.json`

❗️ Open the `package.json` file and add the property `"type":"module"` and save it.

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
 * - Answer.toGet(URLSearchParams{Awswer.getQuestion('params')}, route{string}) - it handles the GET request method.
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
        
        if( typeof give_me_file.invalid !== 'undefined'){
            error = true
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
                    give_me_file = { error: 'URL.searchParam not right' }
                }
            }else{
                outgoing.statusMessage = 'oK'
                outgoing.statusCode = 200
                outgoing.setHeader( 'content-type', 'application/json' )
                buffer = JSON.stringify({'index-route':'response'}).toBuffer()
            }
        }
        
        // obviously answers bad when it rejects :D
        return new Answer( (good, bad )=> {
            
            if(error)
                bad(JSON.stringify(give_me_file).toBuffer())
            
            good( buffer )
        } )
    
    }

}


```

spin up the server --hot wired and socket active at the specified path.  
we will edit the route on the fly and see the changes without reloading the server.  
we will test koorie-shell, switching off the --hot wired and see that no longer any changes to the route will be
rendered.

`npx koorie --static-files=public --socket='options(active:true|path:/tmp/koorie.sock)' --hot`

```shell

curl -verbose http://localhost:3001/?give_me_file=alright
# request/response header shown because of the -verbose flag passed to curl
# the response should be "give me file! alright!"
# ❗ and should also download `alright.txt` when opened in the browser.

```

let's now try the socket

```shell

## not necessary to use any query, simple as it is.
curl -verbose http://localhost:3001/

## in the shell where the server is running check that the log has hot:true
## try to modify the file ./routes/index/route by sending a different Buffer response:
######### good('hello'.toBuffer())

curl -verbose http://localhost:3001

## should print 'hello'

## open another shell terminal
## let's switch off the hot wired
npx koorie-shell set --hot=false --socket-path=/tmp/koorie.sock

## try to modify the route file again
######### good('hello folks'.toBuffer())

## curl again and check the log hot should be set to false and te response should be 'hello'
curl -verbose http://localhost:3001

## CTRL-C to shutdown the server

npx koorie --static-files=public --socket='options(active:true:path:/tmp/koorie.sock)' --hot

curl -verbose http://localhost:3001

## the response should be 'hello folks'

```

__

## Road Map

- [X] `koorie --secure` spawning https server.
- [X] `koorie-shell ssl --generate` generating self-signed certificate.
- [X] **_working on a way to add routes without restarting the server._**
  - **_koorie --hot --socket='options=(active:true:path:/tmp/koorie.sock)_**  
    will spawn a server, hot wired, where editing a route will not require to restart the server to see the changes.  
    **_plus koorie will accept socket connection_** required to change on the fly the hot wired like shown below.
  - **_koorie-shell set --hot=false --socket-path=/tmp/koorie.sock_**  
    will switch off the hot wired and editing routes will require to restart the server to see the changes.
- [ ] `koorie-help flag --address` third executable interface for the help system.
- [X] [EXAMPLES.md](https://github.com/simonedelpopolo/koorie/blob/main/docs/EXAMPLES.md)
- [ ] `koorie-shell ssl --certbot` request to Lets Encrypt for a certificate, installing it and auto updating it.
- [ ] `koorie-shell route` command, relative flags `--add[-a]`, `--delete[-d]` &  
  `--edit[-e] 💡 ENVIRONMENT_VARIABLE EDITOR?`  
  options and any kind of sweets.
- [ ] `koorie-shell inject --route={name}` hot wired required, new route injected in the Object [ koorie.routes ] without restarting the server. This process will edit the middleware.js file.
- [ ] sort of class to send HTML response without reading a file. ⬇︎ 💡:  
  ```javascript
  import {Answer} from 'koorie'
  export async function component(){
    
    // some dynamic and obvious data
    const date = new Date()
  
    // the hypotetical class will handle this in some way.
    const html = () => {

      return (`<div>dynamic component loaded when hit the route[component]! today @ ${date}</div>`)
    }
    
    return new Answer( good => good( html.toBuffer() ))

  }
  ```
  
- [ ] proxy server???
- [ ] koorie website, documentation of APIs and source code.
- [ ] more socket API functionalities

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me
strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look
at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_

