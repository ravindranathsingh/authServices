const UserRepository = require('../repository/user-repo')
const bcrypt = require('bcrypt')
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

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email)
            const passwordsMatch = this.checkPassword(plainPassword, user.password)

            if(!passwordsMatch) {
                console.log('Password does not match')
                throw {error: 'Incorrect Password'}
            }

            const newJWT = this.createToken({email: user.email, id: user.id})
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in signin process')
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in password comparision', error)
            throw {error}
        }
    }
}

module.exports = UserServices