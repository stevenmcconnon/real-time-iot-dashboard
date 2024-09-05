const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const neonPool = new Pool(dbConfig.neon);
const externalPool = new Pool(dbConfig.external);

async function monitorReplication() {
    try {
        const result = await externalPool.query('SELECT * FROM your_table');
        console.log(result.rows);
    } catch (err) {
        console.error('Replication monitoring failed:', err);
    }
}

monitorReplication();
