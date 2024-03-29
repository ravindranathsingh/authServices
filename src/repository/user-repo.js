const { User, Role } = require('../models/index')

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

    async isAdminRole(userId) {
        try {
            const user = await User.findByPk(userId)
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            })
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong at repo layer')
            throw {error}
        }
    }
}

module.exports = UserRepository