let usarNeon = false
if (process.env.VERCEL === '1' || process.env.NEON_SERVERLESS === 'true') usarNeon = true

let pool = null
let sql = null

const cadenaCruda = usarNeon ? process.env.DATABASE_URL : process.env.BASENEON_URL
const cadena = (cadenaCruda || '').replace(/^['"]|['"]$/g, '')

if (usarNeon) {
  const { neon } = require('@neondatabase/serverless')
  if (!cadena) throw new Error('DATABASE_URL requerida en entorno serverless')
  if (/pooler/i.test(cadena)) throw new Error('Usa conexión directa en DATABASE_URL (sin "-pooler")')
  sql = neon(cadena)
} else {
  const { Pool } = require('pg')
  if (!cadena) throw new Error('BASENEON_URL requerida para entorno local')
  pool = new Pool({
    connectionString: cadena,
    ssl: { rejectUnauthorized: false }
  })
}

module.exports = {
  pool,
  consultar: async (texto, parametros = []) => {
    if (usarNeon) return sql.unsafe(texto, parametros)
    return pool.query(texto, parametros)
  }
}
