const { Router } = require("express");
const { getPerfil } = require("../controllers/perfiles.controller");
const router = Router();

router.get("/:candidatoId", getPerfil);

module.exports = router;
