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

module.exports = { create, signIn }