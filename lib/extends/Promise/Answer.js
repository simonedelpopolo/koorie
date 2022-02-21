import { koorieIncoming } from '../../../index.js'

export default class Answer extends Promise {
    
    constructor( responder ) {
        
        super( responder )
    }
    
    static koorie(){
        return koorieIncoming
    }
    
}

