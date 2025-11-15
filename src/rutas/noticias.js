const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')
const { obtenerMetadatos } = require('../servicios/raspador')

router.get('/', async (req, res) => {
  const candidatoId = req.query.candidato_id
  const partidoId = req.query.partido_id
  const q = req.query.q
  let sql = `select id,candidato_id,partido_id,titulo,url,imagen_url,fuente,publicada_en,resumen from noticias where 1=1`
  const params = []
  if (candidatoId) {
    params.push(candidatoId)
    sql += ` and candidato_id=$${params.length}`
  }
  if (partidoId) {
    params.push(partidoId)
    sql += ` and partido_id=$${params.length}`
  }
  if (q) {
    params.push(`%${q.toLowerCase()}%`)
    sql += ` and (lower(titulo) like $${params.length} or lower(resumen) like $${params.length})`
  }
  sql += ` order by publicada_en desc nulls last,id desc`
  const r = await consultar(sql, params)
  res.json(r.rows)
})

router.post('/capturar', async (req, res) => {
  const url = req.body.url
  const candidatoId = req.body.candidato_id
  const partidoId = req.body.partido_id
  if (!url) return res.status(400).json({ error: 'url_requerida' })
  const meta = await obtenerMetadatos(url)
  const publicadaEn = null
  const insert = await consultar(
    `insert into noticias(candidato_id,partido_id,titulo,url,imagen_url,fuente,publicada_en,resumen)
     values($1,$2,$3,$4,$5,$6,$7,$8)
     on conflict(url) do update set titulo=excluded.titulo,imagen_url=excluded.imagen_url,fuente=excluded.fuente,resumen=excluded.resumen
     returning id`,
    [candidatoId || null, partidoId || null, meta.titulo, url, meta.imagen, meta.sitio || 'web', publicadaEn, meta.descripcion]
  )
  res.json({ id: insert.rows[0].id, titulo: meta.titulo, imagen_url: meta.imagen })
})

module.exports = router