const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const tokenservice = require("./token");
const userDto = require("../dto/user");
const {use} = require("express/lib/router");
const {log} = require("nodemon/lib/utils");

class UserService {
    async signup(req, res, fullname, email, password, activationLink) {
        const valerrors = validationResult(req);
        if (!valerrors.isEmpty()) {
            return res.status(400).json({
                valerrors: valerrors.array(),
                message: "Некорректные данные при регистрации"
            })
        }
        const candidate = await User.findOne({email});
        if (candidate) {
            res.status(400).json({message: "Введенный вами адрес электронной почты уже зарегистрирован!"});
        }
        const hashedPassword = await bcrypt.hash(password, 6);

        const role = await Role.findOne({value: "USER"});
        const user = await User.create({fullname, email, password: hashedPassword, activationLink, roles: [role.value]})
        res.status(201).json({message: "Пользователь успешно зарегистрирован"});

        const userdto = new userDto(user); // id, email, isActivated
        const tokens = tokenservice.generateTokens({...userdto});
        await tokenservice.saveToken(userdto.id, tokens.refreshToken);

        return {...tokens, user: userdto};
    }

    async activatelink(res, activationLink) {
        const user = await User.findOne({activationLink});
        console.log(activationLink)
        if (!user) {
            return res.status(400).send({message: "Некорректная ссылка активации"})
        }
        await User.updateOne({activationLink}, {isActivated: true});
        return res.status(201).send({message: "Account verified"})
    }

    async activate(res, email, activationLink) {
        console.log(email, activationLink)
        const useremail = await User.findOne({email});
        if (!useremail) {
            return res.status(400).send({message: "Пользователь не найден"})
        }
        if (useremail.activationLink !== activationLink) {
            return res.status(400).send({message: "Некорректная ссылка активации"})
        } else {
            useremail.isActivated = true;
            await useremail.save();
            return res.status(201).send({message: "Аккаунт активирован"})
        }
    }

    async login(req, res, email, password) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входа"
            })
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Пользователь не найден"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
        }
        const userdto = new userDto(user);
        const tokens = tokenservice.generateTokens({...userdto});
        await tokenservice.saveToken(userdto.id, tokens.refreshToken);

        return {...tokens, user: userdto};
    }
}

module.exports = new UserService();