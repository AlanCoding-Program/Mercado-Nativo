
const URL_API = "https://dummyjson.com/products";

function adaptarProducto(producto) {
    return {
        id: producto.id,
        nombre: producto.title,
        descripcion: producto.description,
        categoria: producto.category,
        precio: producto.price,
        stock: producto.stock,
        imagen: producto.thumbnail,
    };
}

async function obtenerProductos() {
    const respuesta = await fetch(`${URL_API}?limit=30`);
    
    if (!respuesta.ok) {throw new Error("No se pudo obtener el catálogo externo");}
    
    const datos = await respuesta.json();
    return datos.products.map(adaptarProducto);
}

async function obtenerProducto(id) {
    const respuesta = await fetch(`${URL_API}/${id}`);
    
    if (!respuesta.ok) {throw new Error("Producto no encontrado");}
    
    const producto = await respuesta.json();
    return adaptarProducto(producto);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
};
