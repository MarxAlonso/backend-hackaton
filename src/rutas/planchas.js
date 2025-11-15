const express = require('express')
const router = express.Router()
const { consultar } = require('../bd')

router.get('/presidenciales', async (req, res) => {
  const r = await consultar(
    `select pl.id,pl.partido_id,p.nombre as partido,p.acronimo,
            pr.id as presidente_id,pr.nombre_completo as presidente,
            v1.id as vicepresidente1_id,v1.nombre_completo as vicepresidente1,
            v2.id as vicepresidente2_id,v2.nombre_completo as vicepresidente2
     from planchas_presidenciales pl
     join partidos p on p.id=pl.partido_id
     join candidatos pr on pr.id=pl.presidente_id
     left join candidatos v1 on v1.id=pl.vicepresidente1_id
     left join candidatos v2 on v2.id=pl.vicepresidente2_id
     order by p.nombre`
  )
  res.json(r.rows)
})

module.exports = router