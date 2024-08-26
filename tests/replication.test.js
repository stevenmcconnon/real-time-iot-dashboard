const { Pool } = require('pg');
const dbConfig = require('../src/dbConfig');

const pool = new Pool(dbConfig.external);

test('Replicated data should be fetched correctly', async () => {
    const result = await pool.query('SELECT * FROM your_table');
    expect(result.rows).toBeDefined();
    expect(result.rows.length).toBeGreaterThan(0);
});
