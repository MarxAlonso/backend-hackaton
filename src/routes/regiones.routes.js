const { Router } = require("express");
const { getRegiones } = require("../controllers/regiones.controller");
const router = Router();

router.get("/", getRegiones);

module.exports = router;
