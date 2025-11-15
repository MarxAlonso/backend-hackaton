const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')

router.get('/partido/:id', async (req, res) => {
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