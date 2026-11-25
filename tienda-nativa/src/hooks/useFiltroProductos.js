import { useMemo, useState } from "react";

export function useFiltroProductos(productos) {
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
    
    const categorias = useMemo(() => {
        const nombres = productos.map((p) => p.categoria).filter(Boolean);
        return ["Todos", ...new Set(nombres)];
    }, [productos]);
    
    const productosFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase();
        return productos.filter((p) => {
            const coincideBusqueda = !texto || p.nombre?.toLowerCase().includes(texto) || p.descripcion?.toLowerCase().includes(texto);
            const coincideCategoria = categoriaSeleccionada === "Todos" || p.categoria === categoriaSeleccionada;
            return coincideBusqueda && coincideCategoria;
        });
    }, [productos, busqueda, categoriaSeleccionada]);
    
    return {
        busqueda,
        setBusqueda,
        categorias,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        productosFiltrados,
    };
}