const { Pool } = require('pg')
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === 'require' ? { rejectUnauthorized: false } : undefined,
    })
  : null

module.exports = {
  pool,
  consultar: async (texto, parametros) => {
    if (!pool) throw new Error('BD_NO_CONFIGURADA')
    return pool.query(texto, parametros)
  },
}