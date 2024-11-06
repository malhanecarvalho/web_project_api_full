const bcrypt = require('bcrypt');
const { BadRequestError } = require('./errors/apiError');

module.exports = {
    createHash: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },

    validateHash: async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword).then((matched) => {
            if (!matched) {
                throw new BadRequestError({ statusCode: 400, message: 'Senha ou e-mail incorreto' });
            }
            return hashedPassword;
        });
    }
}