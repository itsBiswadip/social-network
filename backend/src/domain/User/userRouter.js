const userController = require('./userController');
const { celebrate, Joi, Segments } = require('celebrate');

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

module.exports = userRouter;