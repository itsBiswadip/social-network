const bcrypt = require('bcrypt');
const { getAuthInfo } = require('../../common/auth');
const userModel = require("./userModel");
const userController = {};

userController.signup = async(req, res, next) => {
	try {
		let attributes = ['userID', 'userName', 'email', 'password'];
		let existingUser = await userModel.findUserByEmail(req.body.email, attributes);
		let user, statusCode;
		if(existingUser) {
			let isMatchingPassword = await bcrypt.compare(req.body.password, existingUser.password);
			if(!isMatchingPassword)
				return res.status(401).json({message: 'User Exists. Wrong Password'});
			user = existingUser;
			statusCode = 200;
		}
		else {
			//encrypt password
			let hashedPassword = await bcrypt.hash(req.body.password,10);

			let newUserId = await userModel.createUser(
					req.body.email, 
					hashedPassword,
					req.body.userName);

			let newUser = await userModel.findUserByUserId(newUserId, attributes);
			user = newUser;
			statusCode = 201;
		}		

		const auth = getAuthInfo(user.userID)
		delete user.password;
		let response = {
			message: 'Success',
			user: user,
			token: auth.token
		}
		res.status(statusCode).json(response);
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

userController.getUser = async(req, res, next)=> {
	try {
		let user = {
			userID: req.user.userID,
			userName: req.user.userName,
			email: req.user.email
		}
		res.json({user});
	} catch (error) {
		next(error);
	}

}

module.exports = userController;