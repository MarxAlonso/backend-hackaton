const { sql } = require("../db");

async function getRegiones(req, res) {
  try {
    const rows = await sql`SELECT * FROM regiones ORDER BY nombre`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo regiones" });
  }
}

module.exports = { getRegiones };
