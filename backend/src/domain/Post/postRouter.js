const postController = require('./postController');
const { celebrate, Joi, Segments } = require('celebrate');
const passport = require('passport');

const postRouter = require('express').Router();


const validCreatePostBody = Joi.object().keys({
    title: Joi.string().max(255).required(),
    content: Joi.string().required(),
});
postRouter.put('/',
    passport.authenticate('jwt', { session: false}),
    celebrate({
        [Segments.BODY]: validCreatePostBody
    }),
    postController.createPost
);

postRouter.post('/',
    passport.authenticate('jwt', { session: false}),
    celebrate({
        [Segments.BODY]: validCreatePostBody
    }),
    postController.createPost
);

const validGetPostsQuery = Joi.object().keys({
    limit: Joi.number().integer().positive().default(10),
    offset: Joi.string().default(0),
});
postRouter.get('/',
    passport.authenticate('jwt', { session: false}),
    celebrate({
        [Segments.QUERY]: validGetPostsQuery
    }),
    postController.getPosts
)

const validLikePostsParams = Joi.object().keys({
    postID: Joi.number().integer().positive(),
});
postRouter.post('/:postID/like',
    passport.authenticate('jwt', { session: false}),
    celebrate({
        [Segments.QUERY]: validLikePostsParams
    }),
    postController.likePost
);

module.exports = postRouter;