require('dotenv').config();

const dbConfig = {
    external: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false },  // This line enables SSL
    },
    neon: {
        user: process.env.NEON_USER,
        host: process.env.NEON_HOST,
        database: process.env.NEON_DB,
        password: process.env.NEON_PASSWORD,
        port: process.env.NEON_PORT,
        ssl: { rejectUnauthorized: false },  // This line enables SSL
    }
};

module.exports = dbConfig;
