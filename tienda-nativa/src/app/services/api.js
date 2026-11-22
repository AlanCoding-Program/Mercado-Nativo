const API_URL = "http://192.168.0.10:3000";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return await respuesta.json();
}

export async function obtenerProducto(id) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el producto");
  }

  return await respuesta.json();
}

export async function realizarCheckout(datosCompra) {
  const respuesta = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(datosCompra),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "No se pudo procesar la compra");
  }

  return datos;
}

// Dejo preparado el servicio para que despues se comunique con el backend de mi amigo lalan
// La direccion ip es proviosria, despues cambiala cuando funcione el backend por la real