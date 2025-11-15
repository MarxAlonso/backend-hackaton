const fs = require('fs')
const path = require('path')
const { consultar } = require('../bd')

async function iniciarBD() {
  if (!process.env.INIT_DB || process.env.INIT_DB !== 'true') return
  const esquema = fs.readFileSync(path.join(__dirname, '../../sql/schema.sql'), 'utf8')
  const datos = fs.readFileSync(path.join(__dirname, '../../sql/seed.sql'), 'utf8')
  if (esquema.trim()) await consultar(esquema)
  if (datos.trim()) await consultar(datos)
}

module.exports = { iniciarBD }