require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { iniciarBD } = require('./bd/inicializacion')
const { pool } = require('./bd')
const candidatos = require('./rutas/candidatos')
const partidos = require('./rutas/partidos')
const planchas = require('./rutas/planchas')
const planes = require('./rutas/planes')
const candidaturas = require('./rutas/candidaturas')
const noticias = require('./rutas/noticias')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/salud', async (req, res) => {
  let bd_conectada = false
  if (pool) {
    try {
      await pool.query('select 1')
      bd_conectada = true
    } catch (e) {}
  }
  res.json({ ok: true, bd_conectada })
})

app.use('/candidatos', candidatos)
app.use('/partidos', partidos)
app.use('/planchas', planchas)
app.use('/planes', planes)
app.use('/candidaturas', candidaturas)
app.use('/noticias', noticias)

const port = process.env.PORT || 3000
iniciarBD()
  .then(() => {
    app.listen(port, () => {})
  })
  .catch(() => {
    app.listen(port, () => {})
  })