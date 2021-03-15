const userController = require('./userController');
const { celebrate, Joi, Segments } = require('celebrate');
const passport = require('passport');

const userRouter = require('express').Router();


const validSignInBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    userName: Joi.string().max(255)
});
userRouter.put('/',
    celebrate({
        [Segments.BODY]: validSignInBody
    }),
    userController.signup
);


const validLoginBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});
userRouter.post('/',
    celebrate({
        [Segments.BODY]: validLoginBody
    }),
    userController.login
);


userRouter.get('/',
    passport.authenticate('jwt', { session: false}),
    userController.getUser
)

module.exports = userRouter;