const path = require('path')
const envPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: envPath })

//Sync Database
require('./dbSync');

/**
 * Generate keys for sigining & verifying jwt 
 * Note: Recreating key pairs will invalidate existing passwords 
 * Run only once
 */
require('./generateKeyPair');