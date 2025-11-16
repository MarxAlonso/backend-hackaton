const { neon } = require("@neondatabase/serverless");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL no está configurado.");
}
if (/pooler/i.test(connectionString)) {
  console.error("DATABASE_URL contiene '-pooler' — usa la conexión directa (sin pooler).");
  throw new Error("Invalid DATABASE_URL: remove '-pooler'");
}

const sql = neon(connectionString);

module.exports = { sql };
