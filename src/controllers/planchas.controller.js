const { sql } = require("../db");

async function getPlanchas(req, res) {
  try {
    const rows = await sql`
      SELECT 
        pp.*,
        pa.nombre AS partido_nombre,
        pres.nombre_completo AS presidente,
        vp1.nombre_completo AS vicepresidente1,
        vp2.nombre_completo AS vicepresidente2
      FROM planchas_presidenciales pp
      LEFT JOIN partidos pa ON pa.id = pp.partido_id
      LEFT JOIN candidatos pres ON pres.id = pp.presidente_id
      LEFT JOIN candidatos vp1 ON vp1.id = pp.vicepresidente1_id
      LEFT JOIN candidatos vp2 ON vp2.id = pp.vicepresidente2_id
      ORDER BY pa.nombre
    `;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo planchas" });
  }
}

module.exports = { getPlanchas };
