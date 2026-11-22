import { createContext, useContext, useState } from "react";
const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const alternarFavorito = (producto) => {
    setFavoritos((actuales) => {
      const existe = actuales.some(
        (item) => item.id === producto.id);

      if (existe) {
        return actuales.filter((item) => item.id !== producto.id);
      }

      return [...actuales, producto];
    });
  };

  const esFavorito = (id) => {
  return favoritos.some((item) => item.id === id);};

  const quitarFavorito = (id) => {setFavoritos((actuales) =>
  actuales.filter((item) => item.id !== id));};

  const vaciarFavoritos = () => { setFavoritos([])};

  return (
    <FavoritosContext.Provider value={{favoritos, alternarFavorito, esFavorito, quitarFavorito, vaciarFavoritos,}}>
    {children}</FavoritosContext.Provider>
  );
}

export function useFavoritos() {
    return useContext(FavoritosContext);}

// Agregar un producto a favoritos
// Quitar un producto de favoritos
// Comprobar si un producto ya es favorito
// Consultar todos los productos guardados