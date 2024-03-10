const UserServices =  require('../service/user-service')

const userServices = new UserServices();

const create = async ( req, res ) => {
    try {
        const response = await userServices.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully created new User',
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to create new User',
            err: error
        })
    }
}

const signIn = async ( req, res ) => {
    try {
        const response = await userServices.signIn(req.body.email, req.body.password)
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully signed In',
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to Sign In',
            err: error
        })
    }
}

const isAuthenticated = async ( req, res ) => {
    try {
        const token = req.headers['x-access-token']
        const response = await userServices.isAuthenticated(token)
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User is authenticated and token is valid',
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: error
        })
    }
}

module.exports = { create, signIn, isAuthenticated }