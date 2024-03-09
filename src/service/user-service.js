const UserRepository = require('../repository/user-repo')

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
}

module.exports = UserServices