const { sql } = require("../db");

async function getNoticias(req, res) {
  try {
    const rows = await sql`SELECT * FROM noticias ORDER BY publicada_en DESC NULLS LAST`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo noticias" });
  }
}

async function getNoticiasByCandidato(req, res) {
  try {
    const id = Number(req.params.candidatoId);
    const rows = await sql`SELECT * FROM noticias WHERE candidato_id = ${id} ORDER BY publicada_en DESC NULLS LAST`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo noticias por candidato" });
  }
}

module.exports = { getNoticias, getNoticiasByCandidato };
