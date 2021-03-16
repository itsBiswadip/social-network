const db = require('../../common/db');
const { QueryTypes } = require('sequelize');

const postModel = {};

postModel.createPost = async(authorID, title, content) => {
    let query = `INSERT 
            INTO Post (authorID, title, content) 
            VALUES (?, ?, ?)`;
    let [newPostID] = await db.query(query, {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: [authorID, title, content]
    })

    return newPostID;
}

postModel.findPostByPostId = async(postId) => {
    let query = `SELECT 
                P.postID,
                P.title,
                P.content,
                P.likes,
                U.userName AS authorName,
                U.email AS authorEmail
            FROM
                Post P
                    INNER JOIN
                User U ON P.authorID = U.userID
            WHERE
                P.postID = ?`;
    let [post] = await db.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: [postId]
    })

    return post;
}

postModel.findLatestPosts = async(limit = 10, offset = 0) => {
    //split in 2 queries since mysql 5.7 doesn't support limit in subquery
    let subQuery = `SELECT 
                GROUP_CONCAT(postID) as postIDs
            FROM
                Post
            ORDER BY postID
            LIMIT ? OFFSET ?`
    let [postIDs] = await db.query(subQuery, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: [limit, offset]
    })

    postIDs = postIDs.postIDs

    console.log({postIDs});

    let query = `SELECT 
                P.postID,
                P.title,
                P.content,
                P.likes,
                U.userName AS authorName,
                U.email AS authorEmail
            FROM
                Post P
                    INNER JOIN
                User U ON P.authorID = U.userID
            WHERE
                P.postID in (${postIDs})`;
    let posts = await db.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
    })

    return posts;
}

postModel.updatePostLike  = async(postId) => {
    let query = `UPDATE Post SET likes = likes + 1 where postID = ?`;
    await db.query(query, {
        raw: true,
        type: QueryTypes.UPDATE,
        replacements: [postId]
    });
}

module.exports = postModel;