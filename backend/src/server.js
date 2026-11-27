
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productosRoutes = require("./routes/productos-routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({mensaje: "API de Mercado Nativo funcionando correctamente",});
});

app.use("/productos", productosRoutes);

app.listen(PORT, () => {console.log(`Servidor ejecutándose en http://localhost:${PORT}`);});
