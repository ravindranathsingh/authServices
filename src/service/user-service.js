const UserRepository = require('../repository/user-repo')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/server-config')

class UserServices {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const response = await this.userRepository.create(data)
            return response;
        } catch (error) {
            console.log('Something went wrong at service layer')
            throw {error}
        }
    }

    async destroy(userId) {
        try {
            await this.userRepository.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log('Something went wrong at service layer')
            throw {error}
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'})
            return result;
        } catch (error) {
            console.log('Something went wrong in token creation')
            throw {error}
        }
    }

    verifyToken(token) {
        try {
            const check = jwt.verify(token, JWT_KEY)
            return check;
        } catch (error) {
            console.log('Something went wrong in token validation', error)
            throw {error}
        }
    }
}

module.exports = UserServices