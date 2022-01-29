import { cp } from 'fs/promises'

await cp( './pkg/files/', '../../', { recursive:true, force:true } ).catch( error => console.log( error ) )
