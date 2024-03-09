const { MongoClient } = require('mongodb')

class Connection {

    static async connectToMongo() {

        if (this.db) return this.db
        const uri = "mongodb://127.0.0.1:27017";
        const client = new MongoClient(uri).db("mai_houses");
        this.db = client
        return this.db
    }
}

Connection.db = null
Connection.url = process.env.DB_CONNECT
Connection.options = {

}

module.exports = { Connection }