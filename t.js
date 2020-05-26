const NGNprice = require('./functions/calcNGN')
NGNprice('BTC', '0.1').then(console.log).catch(console.error)