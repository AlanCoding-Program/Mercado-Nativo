import { View, Text, Image, Pressable } from "react-native";
import { estilos, colores } from "../styles/styles";
export default function ProductoCard({producto, onPress, onAgregar, esFavorito = false, onFavorito,}) {

  return (
    <View style={estilos.tarjeta}>
      <Pressable onPress={onPress}>
        <Image source={{ uri: producto.imagen }} style={estilos.imagenProducto} resizeMode="cover"/>

        <View style={estilos.informacionProducto}>
          <Text style={estilos.categoriaProducto}> {producto.categoria} </Text>
          <Text style={estilos.nombreProducto} numberOfLines={2}> {producto.nombre} </Text>
          <Text style={estilos.descripcionProducto} numberOfLines={2}> {producto.descripcion} </Text>
          <Text style={estilos.precioProducto}> ${Number(producto.precio).toLocaleString("es-AR")} </Text>
        </View>
      </Pressable>

      <Pressable style={estilos.botonFavorito} onPress={onFavorito}>
        <Text style={ esFavorito ? estilos.iconoFavoritoActivo: estilos.iconoFavoritoInactivo}>{esFavorito ? "♥" : "♡"}</Text>
      </Pressable>

      <Pressable style={estilos.botonAgregar} onPress={onAgregar}>
        <Text style={estilos.textoBotonAgregar}> Agregar al carrito </Text>
      </Pressable>
    </View>
  );
}

// Imagen del producto
// Nombre, categoría y precio
// Botón para ver el detalle
// Corazón para agregar o quitar de favoritos
// Botón para agregar al carrito