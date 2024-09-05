const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');
const app = express();

// Set up database connection pool
const pool = new Pool(dbConfig.neon);

// Allow all origins for CORS
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

const dataRoutes = require('./routes');
app.use(dataRoutes);

const simulateData = async () => {
    try {
        const sensorId = `sensor_${Math.floor(Math.random() * 10) + 1}`;
        const temperature = (Math.random() * 10) + 20;
        const humidity = (Math.random() * 20) + 40;
        const pressure = (Math.random() * 20) + 1000;

        await pool.query(`
            INSERT INTO iot_sensor_data (sensor_id, temperature, humidity, pressure)
            VALUES ($1, $2, $3, $4)`, [sensorId, temperature, humidity, pressure]);

        console.log('Data inserted:', { sensorId, temperature, humidity, pressure });

        // Delete old data to stay within RDS limits
        await pool.query(`
            DELETE FROM iot_sensor_data
            WHERE recorded_at < NOW() - INTERVAL '1 day'
        `);
    } catch (err) {
        console.error('Error simulating data:', err);
    }
};

// Run the simulation every 10 seconds
setInterval(simulateData, 10000);

// Handle exit signals to close the pool
process.on('SIGINT', () => {
    console.log("Caught interrupt signal, closing pool.");
    pool.end();
    process.exit();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
