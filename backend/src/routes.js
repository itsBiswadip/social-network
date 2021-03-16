const indexRouter = require('express').Router();

const userRouter = require('./domain/User/userRouter');
const postRouter = require('./domain/Post/postRouter');

indexRouter.use('/users', userRouter);
indexRouter.use('/posts', postRouter);

module.exports = indexRouter;