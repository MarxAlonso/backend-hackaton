const { sql } = require("../db");

async function getPropuestas(req, res) {
  try {
    const rows = await sql`SELECT * FROM propuestas ORDER BY id`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo propuestas" });
  }
}

async function getPropuestasByCandidato(req, res) {
  try {
    const id = Number(req.params.candidatoId);
    const rows = await sql`SELECT * FROM propuestas WHERE candidato_id = ${id} ORDER BY id`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo propuestas por candidato" });
  }
}

module.exports = { getPropuestas, getPropuestasByCandidato };
