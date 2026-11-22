import { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../services/api";
import { useCarrito } from "../context/CarritoContext";
import { useFavoritos } from "../context/FavoritosContext";
import { estilos } from "../styles/styles";

export default function PantallaPrincipal() {
  const router = useRouter();
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const { alternarFavorito, esFavorito } = useFavoritos();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerProductos();
      setProductos(Array.isArray(datos) ? datos : datos.productos || []);
    } catch (e) {
      setError("No se pudieron cargar los productos, intentá devuelta pibe");
    } finally {
      setCargando(false);
    }
  };
  
  useEffect(() => {
    cargarProductos();
  }, []);

  const categorias = useMemo(() => {
    const nombres = productos.map((producto) => producto.categoria).filter(Boolean);
    return ["Todos", ...new Set(nombres)];
}, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria = categoriaSeleccionada === "Todos" || producto.categoria === categoriaSeleccionada;
      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoriaSeleccionada]);

  const manejarAgregar = (producto) => { agregarAlCarrito(producto);
    Alert.alert("Producto agregado", `${producto.nombre} se agregó al carrito.`);
  };

  const manejarFavorito = (producto) => { alternarFavorito(producto);
  };

  const encabezadoCatalogo = (

    <View>
      <Text style={estilos.titulo}>Descubrí nuestros productos</Text>
      <Text style={estilos.subtitulo}>Encontrá lo que estás buscando.</Text>
      <View style={estilos.buscadorContenedor}>
        <Text style={estilos.buscadorIcono}>⌕</Text>
        <TextInput style={estilos.buscador} placeholder="Buscar productos..." placeholderTextColor={colores.textoSecundario}
        value={busqueda} onChangeText={setBusqueda}/></View>

      <View style={estilos.seccionCategorias}>
        <Text style={estilos.tituloSeccion}>Categorías</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.listaCategorias}>
          {categorias.map((categoria) => (
            <Pressable key={categoria}
             style={[ estilos.categoria, categoriaSeleccionada === categoria && estilos.categoriaActiva,]}
              onPress={() => setCategoriaSeleccionada(categoria)}>
              <Text style={[ estilos.categoriaTexto, categoriaSeleccionada === categoria && estilos.categoriaTextoActiva,]}>
                {categoria} </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={estilos.tituloSeccion}>Todos los productos</Text>
    </View>
  );

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header cantidad={cantidadTotal} onPressCarrito={() => router.push("/carrito")} onPressFavoritos={() => router.push("/favoritos")}/>

      {cargando ? (
        <View style={estilos.carga}>
          <ActivityIndicator size="large" />
          <Text style={estilos.textoSecundario}> Cargando productoss...</Text>
        </View>
      ) : error ? (
        <View style={estilos.estadoVacio}>
          <Text style={estilos.estadoVacioTitulo}> No pudimos cargar el catálogo</Text>
          <Text style={estilos.estadoVacioTexto}>{error}</Text>
          <Pressable style={estilos.boton} onPress={cargarProductos}>
            <Text style={estilos.textoBoton}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList data={productosFiltrados} keyExtractor={(item) => String(item.id)} numColumns={2}
          columnWrapperStyle={estilos.filaProductos} contentContainerStyle={estilos.catalogo} ListHeaderComponent={encabezadoCatalogo}
          showsVerticalScrollIndicator={false} renderItem={({ item }) => (
          <ProductoCard producto={item} onPress={() => router.push(`/detalle/${item.id}`)} onAgregar={() => manejarAgregar(item)}
              esFavorito={esFavorito(item.id)} onFavorito={() => manejarFavorito(item)}/>
          )}
          ListEmptyComponent={
            <View style={estilos.estadoVacio}>
              <Text style={estilos.estadoVacioTitulo}>No encontramos productos</Text>
              <Text style={estilos.estadoVacioTexto}>Probá con otra búsqueda o categoría.</Text>
            </View>
          }
        />
      )}

      <View style={estilos.barraInferior}>
        <Pressable style={estilos.elementoBarra} onPress={() => router.replace("/")}>
          <Text style={estilos.textoBarraActivo}>⌂</Text>
          <Text style={estilos.textoBarraActivo}>Inicio</Text>
        </Pressable>

        <Pressable style={estilos.elementoBarra} onPress={() => router.push("/favoritos")}>
          <Text style={estilos.textoBarra}>♡</Text>
          <Text style={estilos.textoBarra}>Favoritos</Text>
        </Pressable>

        <Pressable style={estilos.elementoBarra} onPress={() => router.push("/carrito")}>
          <Text style={estilos.textoBarra}>🛒</Text>
          <Text style={estilos.textoBarra}>Carrito</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
