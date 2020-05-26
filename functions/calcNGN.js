const client2 = require('../providers/Binance2')
const getPriceNairaFromQuantity = async function (coin, amount) {
    try {
        let initial = 0;
        let priceNGN;
        let coinPriceUSD;
        const initialAmount = amount;
        const transactionPercent = 0.1 //in percentage
        const withdrawalCost = 250 // For the fixed withdrawal in Naira

        amount = Number(amount) - ((transactionPercent / 100) * Number(amount))
        if (coin == "BTC") {
            const book = await client2.book({ symbol: 'BTCNGN' })
            const bids = book.bids;
            const coinTicker =  await client2.avgPrice({ symbol: 'BTCUSDT' })
            
            coinPriceUSD = coinTicker.price
            for (const bid of bids) {
                if (amount > initial) {
                    priceNGN = Number(bid.price)
                    initial = Number(bid.quantity) + initial
                    //console.log(bid);
                } else {
                    break;
                }
            }
        }
        const amountInUSD = Number(coinPriceUSD) * Number(amount);
        const amountInNGN = (Number(priceNGN) * Number(amount)) - withdrawalCost;
        const perDollarPriceInNGN  = Number(amountInNGN) / Number(amountInUSD)
        const obj = {
            NGN_price: priceNGN,
            COIN_USD_price: Number(coinPriceUSD),
            per_dollar_price_NGN:  perDollarPriceInNGN,
            coin_amount: initialAmount,
            USD_value: amountInUSD,
        }
        return obj;
    
    } catch (error) {
        throw error
    }
}

module.exports = getPriceNairaFromQuantity;