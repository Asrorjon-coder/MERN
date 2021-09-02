const userservice = require("../../service/user");
const {validationResult} = require("express-validator");

class authController {
    async signup(request, response, next) {
        try {
            const {fullname, email, password, activationLink} = request.body;
            const userData = await userservice.signup(request, response, fullname, email, password, activationLink);
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 86400, httpOnly: true});

            return response.json(userData)
        } catch (e) {
            console.log(e.message)
        }
    }

    async login(request, response, next) {
        try {
            const {email, password} = request.body;
            const userData = await userservice.login(request, response, email, password);
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 86400, httpOnly: true});

            return response.json(userData)
        } catch (e) {
            console.log(e.message)
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async activatelink(request, response, next) {
        try {
            console.log('controller');
            const activationLink = request.params.link;
            console.log(activationLink);
            const userData = await userservice.activatelink(response, activationLink);

            return response.json(userData)
        } catch (e) {
            console.log(e.message)
        }
    }

    async activate(request, response) {
        try {
            const {email, activationLink} = request.body;
            const userData = await userservice.activate(response, email, activationLink);

            return response.json(userData)
        } catch (e) {
            console.log(e.message)
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async users(req, res, next) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new authController();