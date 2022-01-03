function errorHandler(err, req, res, next) {
    let code = 500
    let message = err
    switch (err.name) {
        case 'Authentication':
            code = 400
            message = 'Email or Password is Wrong !!!'
            break;
        case 'Number Id':
            code = 400
            message = 'Id Must Be Number'
            break;
        case 'Invalid Id':
            code = 400
            message = 'Id Not Found !'
            break;
        case 'JsonWebTokenError':
            code = 401
            message = 'Invalid Token !'
            break;
        case 'CastError':
            code = 400
            message = 'Id Not Found !'
            break;
        default:
            break;
    }
    res.status(code).json({ message })
}

module.exports = { errorHandler }