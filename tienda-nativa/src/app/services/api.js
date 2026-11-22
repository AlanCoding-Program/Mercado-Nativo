const API_URL = "http://192.168.0.10:3000";
//la dirección 192.168.0.10 es provisoria, hay que reemplazarla por la real del back ALAN

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return await respuesta.json();
}

export async function realizarCheckout(datosCompra) {
  const respuesta = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosCompra),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "No se pudo procesar la compra");
  }

  return datos;
}
