const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')

router.get('/', async (req, res) => {
  const cargo = req.query.cargo
  let sql
  if (cargo === 'presidente') {
    sql = `
      select c.id,c.nombre_completo,c.foto_url,p.nombre as partido,p.acronimo,p.logo_url,pl.id as plancha_id
      from candidatos c
      join partidos p on p.id=c.partido_id
      left join planchas_presidenciales pl on pl.presidente_id=c.id
      order by c.nombre_completo
    `
  } else {
    sql = `
      select c.id,c.nombre_completo,c.foto_url,p.nombre as partido,p.acronimo,p.logo_url
      from candidatos c
      join partidos p on p.id=c.partido_id
      order by c.nombre_completo
    `
  }
  const r = await consultar(sql)
  res.json(r.rows)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const candidato = await consultar(
    `select c.id,c.nombre_completo,c.foto_url,p.nombre as partido,p.acronimo,p.logo_url
     from candidatos c join partidos p on p.id=c.partido_id where c.id=$1`,
    [id]
  )
  if (candidato.rows.length === 0) return res.status(404).json({ error: 'no_encontrado' })
  const perfil = await consultar(`select hoja_vida from perfiles_candidato where candidato_id=$1`, [id])
  const propuestas = await consultar(
    `select id,titulo,descripcion,categoria,sector,url from propuestas where candidato_id=$1 order by id desc`,
    [id]
  )
  const noticias = await consultar(
    `select id,titulo,url,imagen_url,fuente,publicada_en,resumen from noticias where candidato_id=$1 order by publicada_en desc nulls last,id desc`,
    [id]
  )
  res.json({
    candidato: candidato.rows[0],
    hoja_de_vida: perfil.rows[0] ? perfil.rows[0].hoja_vida : null,
    propuestas: propuestas.rows,
    noticias: noticias.rows,
  })
})

module.exports = router