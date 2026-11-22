import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import ProductoCard from "../components/ProductoCard";
import { useCarrito } from "../context/CarritoContext";
import { useFavoritos } from "../context/FavoritosContext";
import { estilos } from "../styles/styles";

export default function PantallaFavoritos() {
  const router = useRouter();
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const { favoritos, alternarFavorito } = useFavoritos();
  const manejarAgregar = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header cantidad={cantidadTotal} onPressCarrito={() => router.push("/carrito")} onPressFavoritos={() => router.push("/favoritos")}/>
     
      <FlatList data={favoritos} keyExtractor={(item) => String(item.id)} numColumns={2} columnWrapperStyle={estilos.filaProductos}
        contentContainerStyle={estilos.catalogo} showsVerticalScrollIndicator={false} ListHeaderComponent={
          
        <View>
            <Text style={estilos.titulo}>Mis favoritos</Text>
            <Text style={estilos.subtitulo}>Tus productos guardados en un solo lugar.</Text>
            </View>
        }
        renderItem={({ item }) => (
          <ProductoCard producto={item} onPress={() => router.push(`/detalle/${item.id}`)} onAgregar={() => manejarAgregar(item)}
            esFavorito={true} onFavorito={() => alternarFavorito(item)}/>
        )}
        ListEmptyComponent={
          <View style={estilos.estadoVacio}>
            <Text style={estilos.estadoVacioIcono}>♡</Text>
            <Text style={estilos.estadoVacioTitulo}>Todavía no tenés favoritos
            </Text>
            <Text style={estilos.estadoVacioTexto}>Cuando marques un producto en favoritos, aparecerá acá.</Text>
            <Pressable style={estilos.boton} onPress={() => router.replace("/")}>
              <Text style={estilos.textoBoton}>Explorar productos</Text>
            </Pressable>
          </View>
        }
      />

      <View style={estilos.barraInferior}>
        <Pressable style={estilos.elementoBarra} onPress={() => router.replace("/")}>
          <Text style={estilos.textoBarra}>⌂</Text>
          <Text style={estilos.textoBarra}>Inicio</Text>
        </Pressable>

        <Pressable style={estilos.elementoBarra}>
          <Text style={estilos.textoBarraActivo}>♥</Text>
          <Text style={estilos.textoBarraActivo}>Favoritos</Text>
        </Pressable>

        <Pressable style={estilos.elementoBarra} onPress={() => router.push("/carrito")}>
          <Text style={estilos.textoBarra}>🛒</Text>
          <Text style={estilos.textoBarra}>Carrito</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}