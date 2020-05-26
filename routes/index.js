var express = require('express');
var router = express.Router();

var numeral = require('numeral');
const NGNprice = require('../functions/calcNGN');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const coinValues = [0.01, 0.05, 0.1, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5, 7, 10];
  const data = [];

  for (const item of coinValues) {
    const response = await NGNprice('BTC', item)
    data.push(response)
  }

  const result = data.map((item) => {
    return {
      NGN_price: numeral(item.NGN_price).format('0,0'),
      COIN_USD_price: numeral(item.COIN_USD_price).format('0,0.00'),
      per_dollar_price_NGN: numeral(item.per_dollar_price_NGN).format('0,0.00'),
      coin_amount: item.coin_amount,
      USD_value: numeral(item.USD_value).format('0,0.00')
    }
  })

  res.render('index', { title: 'Mad Ife Price from Binance', result });
});

module.exports = router;
