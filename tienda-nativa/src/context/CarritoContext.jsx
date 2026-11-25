// Agregar productos, aumentar cantidades, eliminar productos, vaciar el carrito y calcular el total

import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;

    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const vaciarCarrito = () => { setCarrito([]);};
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad,0);
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{carrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad, vaciarCarrito, cantidadTotal, total,}}> {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
