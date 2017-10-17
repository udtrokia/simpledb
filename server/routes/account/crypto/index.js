
const crypto = require('crypto')
const secret = 'kafka'
const hash= (raw)=>{
    return(crypto.createHmac('sha256',secret)
	   .update(raw.toString())
	    .digest('hex')
	  )
}



module.exports = hash
