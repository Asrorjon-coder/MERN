const {Router} = require("express");
const {check} = require("express-validator");
const router = Router();
const controller = require("./auth/controller");

router.post(
    '/signup',
    [
        check('email', "invalid email")
            .isEmail()
            .normalizeEmail(),
        check('fullname', "enter your fullname, please")
            .isLength({min: 6}),
        check('password', "Ваш пароль должен состоять из 6 или более символов и содержать сочетание букв и хотя бы один номер")
            .isLength({min: 8})
    ], controller.signup
)
router.post(
    '/login',
    [
        check('email', "invalid email")
            .isEmail()
            .normalizeEmail()
    ], controller.login
)
router.post('/logout', controller.logout);
router.post('/activate',
    [
        check('email', "invalid email")
            .isEmail()
            .normalizeEmail()
    ], controller.activate);
router.get('/activate/:link', controller.activatelink);
router.get('/refresh', controller.refresh);
router.get('/users', controller.users);

module.exports = router;