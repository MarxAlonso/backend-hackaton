require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.query("select 'OK' as estado")
  .then(r => console.log(r.rows))
  .catch(e => console.error("ERROR:", e.message))
