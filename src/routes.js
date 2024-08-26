const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig.neon);  // Assuming this is your Neon configuration

// Route to fetch sensor data
router.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM iot_sensor_data');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data from Neon:', err);
        res.status(500).send('Error fetching data');
    }
});

// Route to insert sensor data
router.post('/data', async (req, res) => {
    const { sensor_id, temperature, humidity, pressure } = req.body;
    try {
        await pool.query(
            'INSERT INTO iot_sensor_data (sensor_id, temperature, humidity, pressure) VALUES ($1, $2, $3, $4)',
            [sensor_id, temperature, humidity, pressure]
        );
        res.status(201).send('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data into Neon:', err);
        res.status(500).send('Error inserting data');
    }
});

module.exports = router;
