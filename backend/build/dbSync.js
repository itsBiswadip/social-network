const db = require("../src/common/db");
const UserSchema = require("../src/domain/User/userSchema");
const PostSchema = require("../src/domain/Post/postSchema");


db.authenticate()
.then(async() => {
    await UserSchema.sync();
    await PostSchema.sync();
    console.log("Database Synced Successfully");
})
.catch(error => console.log(error));
