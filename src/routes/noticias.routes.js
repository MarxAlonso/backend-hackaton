const { Router } = require("express");
const { getNoticias, getNoticiasByCandidato } = require("../controllers/noticias.controller");
const router = Router();

router.get("/", getNoticias);
router.get("/candidato/:candidatoId", getNoticiasByCandidato);

module.exports = router;
