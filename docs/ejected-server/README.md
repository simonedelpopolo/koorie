# ejected server

___

###### let's see how to eject koorie and run it independently of the default koorie cli interface.

I use short-concepts words in the comments of the files, like **ejected state** or **hot wired** and so on.  
[➡︎ get the meanings of Design @ GitHub](https://github.com/simonedelpopolo/koorie#design)  

### using 'git clone sparse-checkout' require git v2.19

```shell
git clone --no-checkout --filter=tree:0 https://github.com/simonedelpopolo/koorie
```

```shell
cd koorie && git sparse-checkout set docs/ejected-server
```

```shell
git checkout main && cd docs/ejected-server
```

```shell
npm install koorie
```

➡︎ [jump step by step](#check-it-out)

### step by step

___

```shell
mkdir -p ./ejected-server/public && mkdir -p ./routes/index && cd ejected-server
```

```shell
npm install koorie
```

```shell
echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ejected server</title></head><body><h1>Koorie is simple to set up also in ejected state!</h1></body></html>' > ./public/index.html
```

```shell
touch ejected_single_instance.js && touch ejected_clustered_instances.js && touch middleware.js && touch ./routes/index/route.js
```

___

- EDIT **_filename -> ./package.json_**

❗️ Open the package.json file and add the property "type":"module" and save it.

___

- EDIT **_filename -> ./ejected_single_instance.js_**

```javascript

import { ejected, server } from 'koorie'

/**
 * - this will run a single instance of the server.
 * - type ⇩ just for information on the options that can be set.
 * 
 * @type {{cluster: number, static_files: string, port: number, ejected: string, logger: {quiet: boolean}, socket: {path: string, active: boolean}, hot: boolean, secure: {dhparam: string, active: boolean, cert: string, key: string}}}
 */
const options = {
    static_files: 'public',
    port: 30214
};

/**
 * we import the default middleware function using closure
 */
( await import( `${ process.cwd() }/middleware.js` ) ).default()

/**
 * the ejected function transform the object first into string[]
 * it will be given @[ input.processor ] for the type checking routine
 * finally it will be given @[ koorie.server ] a parsed and kool object.
 */
await server( await ejected( options ) )

```

___

EDIT **_filename -> ./ejected_clustered_instances.js_**

```javascript
import { ejected, server } from 'koorie'

/**
 * - ❗when **forked state** & **ejected state** some options are required
 *
 *   - 'ejected' is a required parameter or flag.
 *   - 'cluster' is a required parameter.
 *
 *   - when **forked state** & **hot wired**
 *     ❗it is required to set the 'hot' : typeof process.env.EJECTED === 'undefined' ? true : process.env.HOT
 *
 *   - the flag [ ejected=ejected_clustered_instances.js ] is required only when it is **koorie interface** to load in **ejected state** the server.
 *   - in this example we will use node to load the server in **ejected state**
 *
 * @type {{cluster: number, static_files: string, port: number, ejected: string, logger: {quiet: boolean}, socket: {path: string, active: boolean}, hot: boolean, secure: {dhparam: string, active: boolean, cert: string, key: string}}}
 */
const options = {
    static_files: 'public',
    port: 30215,
    // - ❗required when clustering because in case of workers death, they are got back to work with the same ENVIRONMENT_VARIABLES.
    hot: typeof process.env.EJECTED === 'undefined' ? true : process.env.HOT,
    /**
     * ❗when clustering in **ejected state** 'ejected' is a required option.
     * it is required and important because the file to be loaded in phase of forking must be the same as this one
     * if not specified the DEFAULT file will be loaded to fork the workers breaking the things up
     * **default file ./node_modules/koorie/koorie.js**
     */
    ejected: 'ejected_clustered_instances.js',
    cluster: undefined // this will fork processes for the half of the available CPUs same as --cluster flag without any argument{void}
};

/**
* we import the default middleware function using closure
*/
( await import( `${ process.cwd() }/middleware.js` ) ).default()

/**
 * the ejected function transform the object first into string[]
 * it will be given @[ input.processor ] for the type checking routine
 * finally it will be given @[ koorie.server ] a parsed and kool object.
 */
await server( await ejected( options ) )
```

___

EDIT **_filename -> ./middleware.js_**

```javascript
import { routes_inject, routes_set } from 'koorie'

export default async () => {
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index } )
    await routes_set()
}
```

___

- EDIT **_filename -> ./routes/index/route.js_**

```javascript
import { Answer } from 'koorie'

/**
 * Route - Index.
 *
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export async function index( ){
    return new Answer( good => good( Buffer.from( JSON.stringify( { 'index-route' : 'response' } ) ) ) )
}
```

___

#### check it out

- spin the single instance
```shell
node ./ejected_single_instance.js
```

> koorie your browsers  
> 1 @ http://localhost:3000/ OR  
> 2 @ http://localhost:3000/index.html

1. response from the route index
2. index.html rendered.

___

- spin the clustered instances

```shell
node ./ejected_clustered_instances.js
```

> koorie your browsers  
> 1 @ http://localhost:3001/ OR  
> 2 @ http://localhost:3001/index.html

1. response from the route index
2. index.html rendered.

___

## simple as drinking a glass of water 🜄
