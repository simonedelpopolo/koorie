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
    outgoing.setHeader('Location', '/')
    const message = Buffer.from( JSON.stringify({redirect: 'remember, koorie is simple.'}) )
    
    return Answer.resolve(message)
}

export default async ()=>{
    // we are mocking something in here uh?
    await routes_inject({ route:'root_index', asyncFunction: index_html  })
    await routes_set()
}
