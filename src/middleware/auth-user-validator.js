const validateUserAuth = ( req, res, next ) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'Either email or password is missing'
        })
    }
    next();
}

const validateAdminRole = ( req, res, next ) => {
    if(!req.body.id) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'User Id is missing'
        })
    }
    next();
}

module.exports = { validateUserAuth, validateAdminRole }