import {cp} from 'fs/promises'

await cp('./pkg/', '../../', {recursive:true, force:true}).catch(error=>console.log(error))
