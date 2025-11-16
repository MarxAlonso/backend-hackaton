const express = require("express");
const cors = require("cors");

const partidosRoutes = require("./routes/partidos.routes");
const candidatosRoutes = require("./routes/candidatos.routes");
const planchasRoutes = require("./routes/planchas.routes");
const perfilesRoutes = require("./routes/perfiles.routes");
const propuestasRoutes = require("./routes/propuestas.routes");
const noticiasRoutes = require("./routes/noticias.routes");
const regionesRoutes = require("./routes/regiones.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/partidos", partidosRoutes);
app.use("/candidatos", candidatosRoutes);
app.use("/planchas", planchasRoutes);
app.use("/perfiles", perfilesRoutes);
app.use("/propuestas", propuestasRoutes);
app.use("/noticias", noticiasRoutes);
app.use("/regiones", regionesRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API Elecciones 2026 — backend listo" });
});

module.exports = app;
