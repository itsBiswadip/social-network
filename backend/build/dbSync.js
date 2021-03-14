const db = require("../src/common/db");
const UserSchema = require("../src/domain/User/userSchema");


db.authenticate()
.then(async() => {
    await UserSchema.sync();
    console.log("Database Synced Successfully");
})
.catch(error => console.log(error));
