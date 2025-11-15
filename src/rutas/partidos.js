const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')

router.get('/', async (req, res) => {
  const r = await consultar(
    `select id,nombre,acronimo,logo_url,sitio_web from partidos order by nombre`
  )
  res.json(r.rows)
})

router.get('/:id/planes', async (req, res) => {
  const id = req.params.id
  const sector = req.query.sector
  let sql = `select id,sector,documento_url,resumen,version from planes_gobierno where partido_id=$1`
  const params = [id]
  if (sector) {
    sql += ` and lower(sector)=lower($2)`
    params.push(sector)
  }
  sql += ` order by sector`
  const r = await consultar(sql, params)
  res.json(r.rows)
})

module.exports = router