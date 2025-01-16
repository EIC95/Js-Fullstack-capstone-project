require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB connection URL with authentication options
const url = process.env.MONGO_URL;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance; // Retourne l'instance existante si elle est déjà connectée
    }

    try {
        // Crée une nouvelle connexion MongoDB
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect(); // Attends la connexion au client

        console.log("Connecté à MongoDB avec succès");

        // Récupère l'instance de la base de données
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error("Erreur de connexion à MongoDB :", err);
        throw err; // Propagation de l'erreur pour la gérer dans les routes
    }
}

module.exports = connectToDatabase;
