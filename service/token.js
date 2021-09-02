const jwt = require('jsonwebtoken');
const config = require('config');
const tokenModel = require('../models/Token');

class Token {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get('jwtSecret'), {expiresIn: '1h'});
        const refreshToken = jwt.sign(payload, config.get('jwtSecret'), {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token
    }
}

module.exports = new Token();