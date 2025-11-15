let usarNeon = false;
if (process.env.VERCEL === '1' || process.env.NEON_SERVERLESS === 'true')
  usarNeon = true;

let pool = null;
let sql = null;

// Limpieza de comillas del .env (algunos editores añaden)
const cadenaOriginal = process.env.BASENEON_URL || '';
const cadena = cadenaOriginal.replace(/^['"]|['"]$/g, '');

if (usarNeon) {
  const { neon } = require('@neondatabase/serverless');
  sql = neon(cadena); // Neon en modo serverless ya infiere SSL
} else {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: cadena,
    ssl: { rejectUnauthorized: false } // <-- Obligatorio para Neon pooler
  });
}

module.exports = {
  pool,
  consultar: async (texto, parametros = []) => {
    if (usarNeon) return sql.unsafe(texto, parametros);
    return pool.query(texto, parametros);
  }
};
