require('dotenv').config()
const { crearApp } = require('./app')
const { iniciarBD } = require('./bd/inicializacion')

const app = crearApp()
const port = process.env.PORT || 3000

iniciarBD()
  .then(() => {
    console.log("BD inicializada.")
    app.listen(port, () => console.log(`Servidor en http://localhost:${port}`))
  })
  .catch((err) => {
    console.error("Error iniciando BD:", err)
    app.listen(port, () => console.log(`Servidor en http://localhost:${port}`))
  })
