import { useEffect, useState } from "react";
import {View, Text, Image, ScrollView, Pressable, ActivityIndicator, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Boton from "../../components/Boton";
import { obtenerProducto } from "../../services/api";
import { useCarrito } from "../../context/CarritoContext";
import { useFavoritos } from "../../context/FavoritosContext";
import { estilos } from "../../styles/styles";

export default function DetalleProducto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { agregarAlCarrito } = useCarrito();
  const { alternarFavorito, esFavorito } = useFavoritos();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setCargando(true);
        setError("");
        
        const datos = await obtenerProducto(id); setProducto(datos.producto || datos);
    } catch (e) {
        setError("No se pudo cargar la información del producto.");
      } finally {
        setCargando(false);
      }
    };

    cargarDetalle();
  }, [id]);

  const manejarAgregar = () => {
    agregarAlCarrito(producto);
    Alert.alert("Producto agregado", `${producto.nombre} se agregó al carrito.`);
  };

  const manejarFavorito = () => {alternarFavorito(producto);

  };

  if (cargando) {
    return (
      <SafeAreaView style={estilos.contenedor}>
        <View style={estilos.carga}>
          <ActivityIndicator size="large" />
          <Text style={estilos.textoSecundario}>Cargando producto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !producto) {
    return (
      <SafeAreaView style={estilos.contenedor}>
        <View style={estilos.estadoVacio}>
          <Text style={estilos.estadoVacioTitulo}>No encontramos el producto</Text>
          <Text style={estilos.estadoVacioTexto}> {error || "El producto solicitado no está disponible."}</Text>
          <Boton titulo="Volver al catálogo" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const favorito = esFavorito(producto.id);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.encabezadoDetalle}>
        <Pressable style={estilos.botonIcono} onPress={() => router.back()}>
          <Text style={estilos.icono}>←</Text>
        </Pressable>

        <Text style={estilos.tituloEncabezado}>Detalle del producto</Text>
        <Pressable style={estilos.botonIcono} onPress={manejarFavorito}>
          <Text style={ favorito ? estilos.iconoFavoritoActivo : estilos.iconoFavoritoInactivo}> {favorito ? "♥" : "♡"} </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.contenidoDetalle}>
        <Image source={{ uri: producto.imagen }} style={estilos.imagenDetalle} resizeMode="contain"/>
        <View style={estilos.detalleContenido}>
          <Text style={estilos.detalleCategoria}> {producto.categoria}</Text>
          <Text style={estilos.detalleNombre}> {producto.nombre}</Text>
          <Text style={estilos.detallePrecio}> ${Number(producto.precio).toLocaleString("es-AR")}</Text>
          <Text style={estilos.tituloSeccion}>Descripción</Text>
          <Text style={estilos.detalleDescripcion}>{producto.descripcion || "No hay una descripción disponible."}</Text>
         
          {producto.stock !== undefined && (
            <Text style={estilos.textoSecundario}>Stock disponible: {producto.stock}</Text>
            )}

          <Boton titulo="Agregar al carrito" onPress={manejarAgregar} disabled={producto.stock !== undefined && producto.stock <= 0}/>
          <Boton titulo={favorito ? "Quitar de favoritos" : "Agregar a favoritos"} onPress={manejarFavorito} secundario/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
