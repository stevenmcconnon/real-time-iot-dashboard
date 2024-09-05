const { Pool } = require('pg');
const dbConfig = require('../src/dbConfig');
const pool = new Pool(dbConfig.neon);

// Track the last known value to introduce fluctuations
let lastTemperature = (Math.random() * 10) + 20;
let lastHumidity = (Math.random() * 20) + 40;
let lastPressure = (Math.random() * 20) + 1000;

const simulateData = async () => {
    try {
        const sensorId = `sensor_${Math.floor(Math.random() * 10) + 1}`;

        // Introduce small fluctuations with occasional larger jumps
        lastTemperature += (Math.random() - 0.5) * 0.5;  // Small fluctuation
        if (Math.random() < 0.05) {  // 5% chance of a larger fluctuation
            lastTemperature += (Math.random() - 0.5) * 5;
        }
        const temperature = Math.max(15, Math.min(35, lastTemperature));  // Keep within a reasonable range

        lastHumidity += (Math.random() - 0.5) * 0.5;
        if (Math.random() < 0.05) {
            lastHumidity += (Math.random() - 0.5) * 10;
        }
        const humidity = Math.max(30, Math.min(70, lastHumidity));

        lastPressure += (Math.random() - 0.5) * 0.1;
        if (Math.random() < 0.05) {
            lastPressure += (Math.random() - 0.5) * 3;
        }
        const pressure = Math.max(995, Math.min(1025, lastPressure));

        await pool.query(`
            INSERT INTO iot_sensor_data (sensor_id, temperature, humidity, pressure)
            VALUES ($1, $2, $3, $4)`, [sensorId, temperature, humidity, pressure]);

        console.log('Data inserted:', { sensorId, temperature, humidity, pressure });

        // Delete old data to stay within RDS limits
        await pool.query(`
            DELETE FROM iot_sensor_data
            WHERE recorded_at < NOW() - INTERVAL '1 day'
        `);

        // Optionally, limit the number of rows in the table
        const limitRows = 1000;  // Set this to a number within free tier limits
        await pool.query(`
            DELETE FROM iot_sensor_data
            WHERE id IN (
                SELECT id FROM iot_sensor_data
                ORDER BY recorded_at ASC
                LIMIT (
                    SELECT GREATEST(COUNT(*) - $1, 0) FROM iot_sensor_data
                )
            )`, [limitRows]);

    } catch (err) {
        console.error('Error simulating data:', err);
    }
};

// Run the simulation every 1/10 second
setInterval(simulateData, 100);

// Handle exit signals to close the pool
process.on('SIGINT', () => {
    console.log("Caught interrupt signal, closing pool.");
    pool.end();
    process.exit();
});
