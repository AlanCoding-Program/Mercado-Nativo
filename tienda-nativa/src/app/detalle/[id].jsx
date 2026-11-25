import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Boton from "@/components/Boton";
import Cargando from "@/components/Cargando";
import EstadoVacio from "@/components/EstadoVacio";
import { useProducto } from "@/hooks/useProducto";
import { useAgregarAlCarrito } from "@/hooks/useAgregarAlCarrito";
import { useFavoritos } from "@/context/FavoritosContext";
import { estilos } from "@/styles/styles";

export default function DetalleProducto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { producto, cargando, error } = useProducto(id);
  const agregar = useAgregarAlCarrito();
  const { alternarFavorito, esFavorito } = useFavoritos();

  if (cargando) {
    return (
      <SafeAreaView style={estilos.contenedor}>
        <Cargando texto="Cargando producto..." />
      </SafeAreaView>
    );
  }

  if (error || !producto) {
    return (
      <SafeAreaView style={estilos.contenedor}>
        <EstadoVacio
          titulo="No encontramos el producto"
          texto={error || "El producto solicitado no está disponible."}
          textoBoton="Volver al catálogo"
          onPressBoton={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  const favorito = esFavorito(producto.id);
  const sinStock = producto.stock !== undefined && producto.stock <= 0;

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.encabezadoDetalle}>
        <Pressable style={estilos.botonIcono} onPress={() => router.back()}>
          <Text style={estilos.icono}>←</Text>
        </Pressable>
        <Text style={estilos.tituloEncabezado}>Detalle del producto</Text>
        <Pressable style={estilos.botonIcono} onPress={() => alternarFavorito(producto)}>
          <Text style={favorito ? estilos.iconoFavoritoActivo : estilos.iconoFavoritoInactivo}>
            {favorito ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.contenidoDetalle}>
        <Image source={{ uri: producto.imagen }} style={estilos.imagenDetalle} resizeMode="contain" />
        <View style={estilos.detalleContenido}>
          <Text style={estilos.detalleCategoria}>{producto.categoria}</Text>
          <Text style={estilos.detalleNombre}>{producto.nombre}</Text>
          <Text style={estilos.detallePrecio}>
            ${Number(producto.precio).toLocaleString("es-AR")}
          </Text>
          <Text style={estilos.tituloSeccion}>Descripción</Text>
          <Text style={estilos.detalleDescripcion}>
            {producto.descripcion || "No hay una descripción disponible."}
          </Text>

          {producto.stock !== undefined && (
            <Text style={estilos.textoSecundario}>Stock disponible: {producto.stock}</Text>
          )}

          <Boton titulo="Agregar al carrito" onPress={() => agregar(producto)} disabled={sinStock} />
          <Boton
            titulo={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            onPress={() => alternarFavorito(producto)}
            secundario
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}