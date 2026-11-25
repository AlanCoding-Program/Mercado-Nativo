import { View, Text, Image, Pressable } from "react-native";
import { estilos } from "@/styles/styles";

export default function ItemCarrito({ item, onCambiarCantidad, onEliminar }) {
    return (
    <View style={estilos.itemCarrito}>
        <Image source={{ uri: item.imagen }} style={estilos.imagenCarrito} />
        <View style={estilos.informacionCarrito}>
            <Text style={estilos.nombreCarrito} numberOfLines={2}>{item.nombre}</Text>
            <Text style={estilos.precioCarrito}>${Number(item.precio).toLocaleString("es-AR")}</Text>
            <View style={estilos.controlesCantidad}>
                <Pressable style={estilos.botonCantidad} onPress={() => onCambiarCantidad(item.id, item.cantidad - 1)}>
                    <Text style={estilos.icono}>−</Text>
                </Pressable>
                <Text style={estilos.cantidadTexto}>{item.cantidad}</Text>
                <Pressable style={estilos.botonCantidad} onPress={() => onCambiarCantidad(item.id, item.cantidad + 1)}>
                    <Text style={estilos.icono}>+</Text>
                </Pressable>
            </View>
        </View>
        <Pressable onPress={() => onEliminar(item.id)}>
            <Text style={estilos.icono}>🗑</Text>
        </Pressable>
    </View>
    );
}