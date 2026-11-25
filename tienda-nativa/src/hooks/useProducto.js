import { useEffect, useState } from "react";
import { obtenerProducto } from "@/services/api";

export function useProducto(id) {
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        let cancelado = false; // evita actualizar estado si la pantalla ya cerro o cambio el id
        
        const cargar = async () => {
            try {
                setCargando(true);
                setError("");
                const datos = await obtenerProducto(id);
                
                if (!cancelado) setProducto(datos.producto || datos);
            } catch {
                if (!cancelado) setError("No se pudo cargar la información del producto.");
            } finally {
                if (!cancelado) setCargando(false);
            }
        };

        cargar();
        return () => {cancelado = true;};
    }, [id]);

    return { producto, cargando, error };
}