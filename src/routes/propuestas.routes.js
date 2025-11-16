const { Router } = require("express");
const { getPropuestas, getPropuestasByCandidato } = require("../controllers/propuestas.controller");
const router = Router();

router.get("/", getPropuestas);
router.get("/candidato/:candidatoId", getPropuestasByCandidato);

module.exports = router;
