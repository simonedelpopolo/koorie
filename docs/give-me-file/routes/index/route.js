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
            
            outgoing.statusCode = 200
            outgoing.setHeader( 'content-type', 'text/html' )
            const message = await readFile(process.cwd() + '/public/index.html').catch(error => Buffer.from( error.message) )/*catch error.message.toBuffer()*/
            
            return Answer.resolve( message )
        }
        
        // this is internal check
        // Answer.toGet( URLSearchParams, path must coincide to the incoming property set in the middleware )
        // if it doesn't set status code 500 and that's it
        if( typeof give_me_file.invalid !== 'undefined'){
            error = true
            outgoing.statusMessage = 'internal_error'
            outgoing.statusCode = 500
            give_me_file = Buffer.from( JSON.stringify(give_me_file) )
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
                    give_me_file = Buffer.from(JSON.stringify({ error: 'URLSearchParams not right' }))
                }
            }else {
                error = true
                outgoing.statusMessage = 'kO'
                outgoing.statusCode = 404
                give_me_file = Buffer.from(JSON.stringify({ error: 'URLSearchParams not right' }))
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
