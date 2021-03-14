const path = require('path')
const envPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envPath })

//Sync Database
require('./dbSync');

//generate keys for sigining & verifying jwt
require('./generateKeyPair');