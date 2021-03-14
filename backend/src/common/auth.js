const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
const fs = require('fs')
const userModel = require('../domain/User/userModel');


const keysDirectory = path.resolve(__dirname, '../../config');

const publicKey = fs.readFileSync(`${keysDirectory}/rsa_public.pem`);
const privateKey = fs.readFileSync(`${keysDirectory}/rsa_private.pem`);


const getAuthInfo = (userID) => {
    let payload = {
        sub: userID,
        iat: Date.now()
    };

    const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256'
    });

    return {
        token: `Bearer ${token}`
    };
}


/**
 * JWT Authentication Middleware
 */

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms: ['RS256'],
};

const strategyForJWT = new JwtStrategy(options, async(payload, done) => {
    try {
        let user = await userModel.findUserByUserId(payload.sub);
        if(user)
            return done(null, user);
        else
            return done(null, false);
    } catch (error) {
        done(error, null);
    }
});

passport.use(strategyForJWT);


module.exports = { getAuthInfo, passport };