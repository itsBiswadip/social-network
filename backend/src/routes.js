const indexRouter = require('express').Router();

const userRouter = require('./domain/User/userRouter');

indexRouter.use('/users', userRouter);

module.exports = indexRouter;