const { User } = require('../models/index')

class UserRepository {

    async create(data) {
        try {
            const response = await User.create(data)
            return response;
        } catch (error) {
            console.log('Something went wrong at repo layer')
            throw {error}
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log('Something went wrong at repo layer')
            throw {error}
        }
    }

    async getById(userId) {
        try {
            const response = await User.findByPk(userId, {
                attributes: ['email', 'id']
            })
            return response
        } catch (error) {
            console.log('Something went wrong at repo layer')
            throw {error}
        }
    }

    async getByEmail(userEmail) {
        try {
            const response = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            return response
        } catch (error) {
            console.log('Something went wrong at repo layer')
            throw {error}
        }
    }
}

module.exports = UserRepository