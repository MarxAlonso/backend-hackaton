const { sql } = require("../db");

async function getCandidatos(req, res) {
  try {
    const rows = await sql`
      SELECT c.*, p.nombre as partido_nombre
      FROM candidatos c
      LEFT JOIN partidos p ON p.id = c.partido_id
      ORDER BY c.nombre_completo
    `;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo candidatos" });
  }
}

async function getCandidatosByPartido(req, res) {
  try {
    const pid = Number(req.params.partidoId);
    const rows = await sql`
      SELECT c.*, p.nombre as partido_nombre
      FROM candidatos c
      LEFT JOIN partidos p ON p.id = c.partido_id
      WHERE c.partido_id = ${pid}
      ORDER BY c.nombre_completo
    `;
    res.json({ ok: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error por partido" });
  }
}

async function getCandidatoById(req, res) {
  try {
    const id = Number(req.params.id);
    const candidato = await sql`
      SELECT c.*, p.nombre as partido_nombre
      FROM candidatos c
      LEFT JOIN partidos p ON p.id = c.partido_id
      WHERE c.id = ${id}
    `;
    if (!candidato || candidato.length === 0) return res.status(404).json({ ok: false, error: "Candidato no encontrado" });

    const perfil = await sql`SELECT hoja_vida FROM perfiles_candidato WHERE candidato_id = ${id}`;
    const propuestas = await sql`SELECT * FROM propuestas WHERE candidato_id = ${id} ORDER BY id`;
    const candidaturas = await sql`
      SELECT ca.*, r.nombre as region_nombre
      FROM candidaturas ca
      LEFT JOIN regiones r ON r.id = ca.region_id
      WHERE ca.candidato_id = ${id}
    `;
    const noticias = await sql`SELECT * FROM noticias WHERE candidato_id = ${id} ORDER BY publicada_en DESC`;

    res.json({
      ok: true,
      data: {
        ...candidato[0],
        hoja_vida: perfil[0]?.hoja_vida || null,
        propuestas,
        candidaturas,
        noticias
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error obteniendo candidato" });
  }
}

module.exports = { getCandidatos, getCandidatoById, getCandidatosByPartido };
