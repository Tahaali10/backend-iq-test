// scripts/migrateTermsConditions.js
const mongoose = require('mongoose');
const TermsConditions = require('../models/termsConditions');
const mariadb = require('mariadb');

// Set up connections
const mongoConnection = mongoose.connect(process.env.MONGO_URI);
const mariadbPool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
});

async function migrate() {
  try {
    // Get data from MariaDB
    const conn = await mariadbPool.getConnection();
    const rows = await conn.query('SELECT * FROM terms_conditions');
    conn.release();

    // Insert into MongoDB
    for (const row of rows) {
      const terms = new TermsConditions({
        title: row.title,
        content: row.content,
        is_deleted: row.is_deleted,
        created_at: row.created_at
      });
      await terms.save();
      console.log(`Migrated terms: ${row.title}`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();