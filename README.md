# Koorie

###### Node.js server.

___

## Index of Contents

- [Description](#description)
  - [The name Koorie](#the-name-koorie)
  - [Yet another NodeJS server](#yet-another-nodejs-server)
- [Installation](#installation)
- [Koorie library](#koorie-library)
  - [Koorie terminal flags](#koorie-terminal-flags)
    - [--static-files questions](#--static-files-questions)
    - [--cluster[-c]](#--cluster-c)
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

```shell

mkdir my-stunning-server && cd my-stunning-server
npm install koorie

```

After the installation phase npm runs the script postinstall.  
This script copies from the node_modules/koorie/pkg some files to bootstrap and facilitate the understanding on how Koorie works.  
The postinstall script will be deleted on operation completed.

> ⚠ When cloning the repository from GitHub run `npm install --ignore-scripts`! or much better remove the script postinstall from the package.json, to be sure that any other dev/dependencies can run their own postinstall script

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

npx koorie --port=3005 --address=localhost --cluster --static-files=public

```

> ℹ open the browser at http://localhost:3005

___

#### Koorie terminal flags.

___

| flags                                | description                                                                                                                                      | simple usage              |
|:-------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------|
| --port[-p]={number}                  | Sets the port to listen from. Default set to 3001.                                                                                               | `npx koorie -p=3028`      |
| --address[-a]={string}               | Sets the address to listen from. Default set to localhost.                                                                                       | `npx koorie -a=localhost` |
| --react[-r]={void}                   | It tells to Koorie to expect a React application. <br/>Koorie will look for an index.html file under the `public` directory.                     | `npx koorie --react`      |
| --static-files={string}              | It tells to Koorie to serve the files located in the specified directory. It is required flag to skip the [questions](#--static-files-questions) | `npx koorie -s=public`    |
| --domain[-d]={string}                | Default is set to the --address value. Road map -> kind of proxy server?                                                                         | `npx koorie -d=localhost` |
| --protocol[-l]={string}              | Default is set to `http`. Road map -> to spawn a https server                                                                                    | `npx koorie -l=https`     |
| --cluster[-c]={void}-{number}-{JSON} | When {void} it forks the process for the half of the available CPUs. Detailed at [cluster](#--cluster-c)                                         | `npx koorie --cluster`    |

> ℹ If all the flags are omitted the default port is `3001`, the address is `localhost` and only a `single` instance of the process will run.

___

 - ##### --static-files questions

 - --static-files[-s]
   - questions: This flag is not required but when is not passed to the terminal it will show a warning asking if it is fine to set the `public` directory at the root directory of the project.  
   - answers: `yes|no OR y|n`
     - yes - The process will proceed showing a warning in the console that the `public` directory is set to the root directory of the project. Koorie will look "here" for files requested at the server. Not that safe right?
     - no - It will ask to specify a directory.

___

 - ##### --cluster[-c]

   - --cluster[-c]=4 -> It forks the process on 4 CPUs.
   - --cluster[-c]='{"cpus":8,"init":"default"}' It accepts, at the moment, only two properties `{"cpus":{number},"init":"{string}"}`.
     -  `"cpus"` is the desired number of cpus.
     -  `"init"` is the path to the file that will be executed during fork. "init":"default" executes the ./index.js ( it is an executable ) under the root directory of the project.

read the docs at [Cluster | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/cluster.html#clustersetupprimarysettings) for cluster.setupPrimary

___

#### Creating routes

Koorie has a simple interface for creating routes and handle them.  
Let's see how to add one route and make a request to it.

#### Route - `index`

filename `./middleware.js`

it may be already in the root directory of the project but let's proceed like it is not there.

```javascript
import { routes } from 'koorie'

export default async () => {
    // pushing the route 'index' into the koorie.routes Module.
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    // checks for AsyncFunction into the route 'index' Module. if everyting is ok seals the routes ready to be called into koorie.routing Module
    await routes.set()
}

```

filename `./routes/index/route.js`

```javascript
/**
 * Route (- index) - The simplest way to serve a route.
 *
 * @returns {PromiseFulfilledResult{Buffer}}
 */
export async function index(){
    
    return Promise( resolve => {
        
        resolve(Buffer.from(JSON.stringify({'index-route':'response'})))
    })
}

```
___

### JetBrains OSS License

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_

