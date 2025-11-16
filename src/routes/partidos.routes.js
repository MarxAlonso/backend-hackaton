const { Router } = require("express");
const { getPartidos, getPartido } = require("../controllers/partidos.controller");
const router = Router();

router.get("/", getPartidos);
router.get("/:id", getPartido);

module.exports = router;
