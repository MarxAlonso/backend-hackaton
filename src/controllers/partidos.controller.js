const { sql } = require("../db");

async function getPartidos(req, res) {
  try {
    const rows = await sql`SELECT * FROM partidos ORDER BY nombre`;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo partidos" });
  }
}

async function getPartido(req, res) {
  try {
    const id = Number(req.params.id);
    const rows = await sql`SELECT * FROM partidos WHERE id = ${id}`;
    if (!rows || rows.length === 0) return res.status(404).json({ ok: false, error: "Partido no encontrado" });
    const party = rows[0];

    const planchas = await sql`
      SELECT pp.*, p_pres.nombre_completo as presidente, p_vp1.nombre_completo as vicepresidente1, p_vp2.nombre_completo as vicepresidente2
      FROM planchas_presidenciales pp
      LEFT JOIN candidatos p_pres ON p_pres.id = pp.presidente_id
      LEFT JOIN candidatos p_vp1 ON p_vp1.id = pp.vicepresidente1_id
      LEFT JOIN candidatos p_vp2 ON p_vp2.id = pp.vicepresidente2_id
      WHERE pp.partido_id = ${id}
    `;

    const candidatos = await sql`SELECT * FROM candidatos WHERE partido_id = ${id} ORDER BY nombre_completo`;
    const planes = await sql`SELECT * FROM planes_gobierno WHERE partido_id = ${id}`;

    res.json({ ok: true, data: { party, planchas, candidatos, planes } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo partido" });
  }
}

module.exports = { getPartidos, getPartido };
