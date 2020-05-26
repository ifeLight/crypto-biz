const Binance = require('binance-api-node').default;
const dotenv = require('dotenv')

dotenv.config()

// Authenticated client, can make signed calls
const client = Binance()


module.exports = client;