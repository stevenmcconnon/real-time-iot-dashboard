const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const externalPool = new Pool(dbConfig.external);
const neonPool = new Pool(dbConfig.neon);

// Route to fetch data from the external database
router.get('/external-data', async (req, res) => {
    console.log('res', res)
    try {
        const result = await externalPool.query('SELECT * FROM iot_sensor_data ORDER BY recorded_at DESC LIMIT 100');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching external data:', err.stack);
        res.status(500).send('Error fetching external data');
    }
});

// Route to fetch data from the Neon database
router.get('/neon-data', async (req, res) => {
    try {
        const result = await neonPool.query('SELECT * FROM iot_sensor_data ORDER BY recorded_at DESC LIMIT 100');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching Neon data:', err);
        res.status(500).send('Error fetching Neon data');
    }
});

module.exports = router;
