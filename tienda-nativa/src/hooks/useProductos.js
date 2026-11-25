import { useCallback, useEffect, useState } from "react";
import { obtenerProductos } from "@/services/api";

export function useProductos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    
    const cargar = useCallback(async () => {
        try {
            setCargando(true);
            setError("");
            const datos = await obtenerProductos();
            setProductos(Array.isArray(datos) ? datos : datos.productos || []);
        } catch {
            setError("No se pudieron cargar los productos. Intentá de nuevo.");
        } finally {
            setCargando(false);
        }
    }, []);
    
    useEffect(() => {cargar();}, [cargar]);

return { productos, cargando, error, recargar: cargar };
}