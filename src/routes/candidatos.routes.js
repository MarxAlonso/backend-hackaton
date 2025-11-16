const { Router } = require("express");
const {
  getCandidatos,
  getCandidatoById,
  getCandidatosByPartido
} = require("../controllers/candidatos.controller");
const router = Router();

router.get("/", getCandidatos);
router.get("/partido/:partidoId", getCandidatosByPartido);
router.get("/:id", getCandidatoById);

module.exports = router;
