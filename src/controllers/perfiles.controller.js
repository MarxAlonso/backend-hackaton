const { sql } = require("../db");

async function getPerfil(req, res) {
  try {
    const candidatoId = Number(req.params.candidatoId);
    const rows = await sql`SELECT hoja_vida FROM perfiles_candidato WHERE candidato_id = ${candidatoId}`;
    if (!rows || rows.length === 0) return res.status(404).json({ ok: false, error: "Perfil no encontrado" });
    res.json({ ok: true, data: rows[0].hoja_vida });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo perfil" });
  }
}

module.exports = { getPerfil };
