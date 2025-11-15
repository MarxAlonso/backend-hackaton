const express = require('express')
const cors = require('cors')
const { pool, consultar } = require('./bd')
const { iniciarBD } = require('./bd/inicializacion')
const candidatos = require('./rutas/candidatos')
const partidos = require('./rutas/partidos')
const planchas = require('./rutas/planchas')
const planes = require('./rutas/planes')
const candidaturas = require('./rutas/candidaturas')
const noticias = require('./rutas/noticias')

function crearApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/salud', async (req, res) => {
    let bd_conectada = false
    try {
      if (pool) await pool.query('select 1')
      else await consultar('select 1')
      bd_conectada = true
    } catch (e) {
      console.error("ERROR BD /salud:", e.message)
    }
    res.json({ ok: true, bd_conectada })
  })

  app.use('/candidatos', candidatos)
  app.use('/partidos', partidos)
  app.use('/planchas', planchas)
  app.use('/planes', planes)
  app.use('/candidaturas', candidaturas)
  app.use('/noticias', noticias)

  return app
}

module.exports = { crearApp }