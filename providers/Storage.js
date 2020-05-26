const { MongoStorage } = require('mongodb-keyval-storage')

let theStorage = new MongoStorage({
    db: "mongodb://localhost:27017/db",
    collectionName: "futureBot"
})

module.exports = theStorage;

