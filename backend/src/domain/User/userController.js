const bcrypt = require('bcrypt');
const { getAuthInfo } = require('../../common/auth');
const userModel = require("./userModel");
const userController = {};

userController.signup = async(req, res, next) => {
	try {
		let attributes = ['userID', 'userName', 'email'];
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

		const auth = getAuthInfo(newUser.userID)
		let response = {
			message: 'Success',
			user: newUser,
			token: auth.token
		}
		res.status(201).json(response);
	} catch (error) {
		next(error);
	}
}

userController.login = async(req, res, next) => {
	try {
		let attributes = ['userID', 'userName', 'email', 'password'];
		let existingUser = await userModel.findUserByEmail(req.body.email, attributes);
		if(!existingUser)
			return res.status(401).json({message: 'User not found'})
		
		let isMatchingPassword = await bcrypt.compare(req.body.password, existingUser.password);
		if(!isMatchingPassword)
			return res.status(401).json({message: 'Wrong Password'});
		
		const auth = getAuthInfo(existingUser.userID);
		delete existingUser.password;
		let response = {
			message: 'Success',
			user: existingUser,
			token: auth.token
		}
		res.json(response);
		
		
	} catch (error) {
		next(error);
	}
}

module.exports = userController;