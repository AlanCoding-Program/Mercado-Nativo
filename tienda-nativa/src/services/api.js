import { PRODUCTOS_MOCK } from "./productosMock";

// true  = usa datos de prueba (no necesita backend)
// false = se comunica con el backend real
const USAR_MOCK = true;

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.10:3000";

// Simula la demora de una conexión real, para poder ver el estado "Cargando..."
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

export async function obtenerProductos() {
  if (USAR_MOCK) {
    await esperar(600);
    return PRODUCTOS_MOCK;
  }

  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return await respuesta.json();
}

export async function obtenerProducto(id) {
  if (USAR_MOCK) {
    await esperar(400);
    const producto = PRODUCTOS_MOCK.find((p) => String(p.id) === String(id));

    if (!producto) {
      throw new Error("No se pudo obtener el producto");
    }

    return producto;
  }

  const respuesta = await fetch(`${API_URL}/productos/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el producto");
  }

  return await respuesta.json();
}

export async function realizarCheckout(datosCompra) {
  if (USAR_MOCK) {
    await esperar(800);
    return { mensaje: "Compra simulada", numeroOrden: Math.floor(Math.random() * 90000) + 10000 };
  }

  const respuesta = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosCompra),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "No se pudo procesar la compra");
  }

  return datos;
}