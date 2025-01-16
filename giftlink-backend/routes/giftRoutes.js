const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db'); // Assuming db.js exports the connectToDatabase function
const { ObjectId } = require('mongodb'); // Import ObjectId
// GET /api/ - Retrieve all gifts
router.get('/', async (req, res) => {
    try {
        console.log('Connecting to the database...');
        const db = await connectToDatabase();
        console.log('Connected to the database.');

        const collection = db.collection('gifts');
        console.log('Fetching gifts...');
        const gifts = await collection.find({}).toArray();

        console.log('Gifts fetched:', gifts);
        res.json(gifts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching gifts' });
    }
});


// GET /api/:id - Retrieve a gift by custom ID field
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        if (!db) {
            console.error('Failed to connect to the database');
            return res.status(500).json({ error: 'Database connection failed' });
        }

        const collection = db.collection('gifts');
        const giftId = req.params.id;

        // Find the gift by custom `id` field (string) instead of `_id` (ObjectId)
        const gift = await collection.findOne({ id: giftId });

        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }

        // Return the gift
        res.json(gift);
    } catch (error) {
        console.error('Error fetching gift by ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the gift' });
    }
});


// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
