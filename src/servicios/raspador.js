const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function obtenerMetadatos(url) {
  const res = await fetch(url, { timeout: 15000 })
  const html = await res.text()
  const $ = cheerio.load(html)
  const titulo =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text() ||
    url
  const imagen =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    ''
  const sitio =
    $('meta[property="og:site_name"]').attr('content') ||
    $('meta[name="twitter:site"]').attr('content') ||
    ''
  const descripcion =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    ''
  return { titulo, imagen, sitio, descripcion }
}

module.exports = { obtenerMetadatos }