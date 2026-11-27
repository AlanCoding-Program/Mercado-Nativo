
const express = require("express");
const router = express.Router();

const {
    obtenerProductos,
    obtenerProducto,
} = require("../services/productos-service");

router.get("/", async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(502).json({mensaje: error.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const producto = await obtenerProducto(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(404).json({mensaje: error.message});
    }
});

module.exports = router;
