const jwt = require('jsonwebtoken')
require('dotenv').config()

function autenticacaoMiddleware(request,response, next) {
    console.log(request.headers.token)

    let auth = false

    if(request.headers.token){
        const {token} = request.headers

        try {
            jwt.verify(token, process.env.APP_KEY_TOKEN)
            auth = true
        }
        catch(JsonWebTokenError)
        {
            return response.status(403).send("token inválido", JsonWebTokenError )
        }
        
    }

    if (auth === false){
        return response.status(403).send('não autorizado')
    }
    next();
} 


module.exports = autenticacaoMiddleware;