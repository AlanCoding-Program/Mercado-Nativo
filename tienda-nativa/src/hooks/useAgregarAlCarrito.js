import { Alert } from "react-native";
import { useCarrito } from "@/context/CarritoContext";

export function useAgregarAlCarrito() {
    const { agregarAlCarrito } = useCarrito();
    
    return (producto) => {
        agregarAlCarrito(producto);
        Alert.alert("Producto agregado", `${producto.nombre} se agregó al carrito.`);
    };
}