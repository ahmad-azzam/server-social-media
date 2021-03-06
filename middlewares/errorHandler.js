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
        case 'CastError':
            code = 400
            message = 'Id Not Found !'
            break;
        case 'JsonWebTokenError':
            code = 401
            message = 'Invalid Token !'
            break;
        case 'Forbidden':
            code = 403
            message = 'You havent access to this user'
            break;
        case 'Cant Follow Yourself':
            code = 403
            message = 'Cannot follow yourself'
            break;
        case 'Already Follow':
            code = 403
            message = 'You have already follow this user'
            break;
        case 'Cant UnFollow Yourself':
            code = 403
            message = 'Cannot unfollow yourself'
            break;
        case 'Already UnFollow':
            code = 403
            message = 'You have already unfollow this user'
            break;
        case 'Forbidden Post':
            code = 403
            message = 'Forbidden to update this post'
            break;
        default:
            break;
    }
    res.status(code).json({ message })
}

module.exports = { errorHandler }