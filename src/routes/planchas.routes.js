const { Router } = require("express");
const { getPlanchas } = require("../controllers/planchas.controller");
const router = Router();

router.get("/", getPlanchas);

module.exports = router;
