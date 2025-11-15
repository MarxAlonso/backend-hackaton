const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')

router.get('/', async (req, res) => {
  const cargo = req.query.cargo
  const ambito = req.query.ambito
  const regionId = req.query.region_id
  let sql = `
    select ca.id,ca.cargo,ca.ambito,ca.numero_lista,
           c.id as candidato_id,c.nombre_completo,c.foto_url,
           p.nombre as partido,p.acronimo,
           r.id as region_id,r.nombre as region,r.tipo as tipo_region
    from candidaturas ca
    join candidatos c on c.id=ca.candidato_id
    join partidos p on p.id=c.partido_id
    left join regiones r on r.id=ca.region_id
    where 1=1`
  const params = []
  if (cargo) {
    params.push(cargo)
    sql += ` and lower(ca.cargo)=lower($${params.length})`
  }
  if (ambito) {
    params.push(ambito)
    sql += ` and lower(ca.ambito)=lower($${params.length})`
  }
  if (regionId) {
    params.push(regionId)
    sql += ` and ca.region_id=$${params.length}`
  }
  sql += ` order by r.nombre nulls last,c.nombre_completo`
  const r = await consultar(sql, params)
  res.json(r.rows)
})

module.exports = router