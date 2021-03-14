const bcrypt = require('bcrypt');
const userModel = require("./userModel");
const userController = {};

userController.signup = async(req, res, next) => {
	try {
		let attributes = ['userId', 'userName', 'email'];
		let existingUser = await userModel.findUserByEmail(req.body.email, attributes);
		if(existingUser)
			return res.json(existingUser);

		//encrypt password
		let hashedPassword = await bcrypt.hash(req.body.password,10);

		let newUserId = await userModel.createUser(
				req.body.email, 
				hashedPassword,
				req.body.userName);

		let newUser = await userModel.findUserByUserId(newUserId, attributes);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
}

module.exports = userController;