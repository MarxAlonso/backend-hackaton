const { crearApp } = require('../src/app');
const app = crearApp();

module.exports = (req, res) => {
  try {
    app(req, res);
  } catch (e) {
    console.error("❌ Error en serverless:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
};
