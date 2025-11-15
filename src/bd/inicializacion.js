const fs = require('fs')
const path = require('path')
const { consultar } = require('../bd')

async function iniciarBD() {
  if (!process.env.INIT_DB || process.env.INIT_DB !== 'true') return
  const esquema = fs.readFileSync(path.join(__dirname, '../../sql/schema.sql'), 'utf8')
  const datos = fs.readFileSync(path.join(__dirname, '../../sql/seed.sql'), 'utf8')
  if (esquema.trim()) {
    const partes = esquema.split(/;\s*\n/g).map(x => x.trim()).filter(Boolean)
    for (const p of partes) {
      await consultar(p)
    }
  }
  if (datos.trim()) {
    const partes = datos.split(/;\s*\n/g).map(x => x.trim()).filter(Boolean)
    for (const p of partes) {
      await consultar(p)
    }
  }
}

module.exports = { iniciarBD }