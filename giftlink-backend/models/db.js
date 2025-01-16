// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    await client.connect(function (err){
        if(err){
            if(err){
                console.log('Erreur de connexion a mongodb' , err)
            }
            return;
        }

        const dbInstance = client.db(dbName)

        return dbInstance;
    })
}

module.exports = connectToDatabase;
