const {User, Token} = require('../../models');
const ApiError = require('../../error/ApiError');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const mailModel = require('../mail/mailModel');
const tokensModel = require('../tokens/tokensModel');
const UserDto = require('./dtos/UserDto');

class AuthModel {
    REGISTRATION_ERROR_TEXT = 'user with this email already exists';

    LOGIN_EMPTY_DATA_TEXT = 'email or password is empty';
    LOGIN_USER_ERROR_TEXT = 'user with this email wasn\'t found';
    LOGIN_PASSWORD_ERROR_TEXT = 'password is wrong';

    ACTIVATION_ERROR_TEXT = 'user wasn\'t found';

    link(activationLink) {
        return `${process.env.API_URL}/api/auth/activate/${activationLink}`;
    }

    async registration(username, email, password, role) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.badRequest(this.REGISTRATION_ERROR_TEXT);
        }

        const id = uuid.v4();
        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            id, username, password: hashPassword, email, activationLink, role
        });
        await mailModel.sendMail(email, this.link(activationLink));

        return await this.#finishAuthorization(user);
    }

    async login(email, password) {
        if (!email || !password) {
            throw ApiError.badRequest(this.LOGIN_EMPTY_DATA_TEXT);
        }

        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest(this.LOGIN_USER_ERROR_TEXT);
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            throw ApiError.badRequest(this.LOGIN_PASSWORD_ERROR_TEXT);
        }

        const activationLink = uuid.v4();
        user.activationLink = activationLink;
        await user.save();
        await mailModel.sendMail(email, this.link(activationLink));

        return await this.#finishAuthorization(user);
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const token = await Token.findOne({where: {refreshToken}});
        if (!token) {
            throw ApiError.unauthorized();
        }

        const user = await User.findByPk(token.userId);
        if (!user) {
            throw ApiError.unauthorized();
        }

        user.isActivated = false;
        await user.save();
        await token.destroy();
    }

    async activate(link) {
        const user = await User.findOne({where: {activationLink: link}});
        if (!user) {
            throw ApiError.badRequest(this.ACTIVATION_ERROR_TEXT);
        }

        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const tokenFromDB = await Token.findOne({where: {refreshToken}});
        const userData = tokensModel.validateRefreshToken(refreshToken);
        if (!tokenFromDB  || !userData) {
            throw ApiError.unauthorized();
        }

        const user = await User.findByPk(userData.id);
        return await this.#finishAuthorization(user);
    }

    async #finishAuthorization(user) {
        const userDto = new UserDto(user);
        const tokens = tokensModel.generateTokens({
            id: userDto.id, email: userDto.email, role: userDto.role
        });
        console.log(userDto);
        await tokensModel.saveTokens(tokens.refreshToken, userDto.id);
        return {...tokens, user: userDto};
    }
}

module.exports = new AuthModel();