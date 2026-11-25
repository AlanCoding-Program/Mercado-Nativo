// src/app/carrito.jsx  (reemplaza el placeholder)
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Boton from "@/components/Boton";
import EstadoVacio from "@/components/EstadoVacio";
import ItemCarrito from "@/components/ItemCarrito";
import BarraInferior from "@/components/BarraInferior";
import { useCarrito } from "@/context/CarritoContext";
import { estilos } from "@/styles/styles";

export default function PantallaCarrito() {
  const router = useRouter();
  const { carrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header />
      <FlatList
        data={carrito}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.catalogo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={[estilos.titulo, { marginBottom: 12 }]}>Mi carrito</Text>}
        renderItem={({ item }) => (
          <ItemCarrito
            item={item}
            onCambiarCantidad={cambiarCantidad}
            onEliminar={eliminarDelCarrito}
          />
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="🛒"
            titulo="Tu carrito está vacío"
            texto="Agregá productos para verlos acá."
            textoBoton="Explorar productos"
            onPressBoton={() => router.replace("/")}
          />
        }
        ListFooterComponent={
          carrito.length > 0 ? (
            <View style={estilos.resumenCompra}>
              <Text style={estilos.textoSecundario}>Total</Text>
              <Text style={estilos.totalCompra}>${total.toLocaleString("es-AR")}</Text>
              <Boton titulo="Vaciar carrito" onPress={vaciarCarrito} secundario />
            </View>
          ) : null
        }
      />
      <BarraInferior activa="carrito" />
    </SafeAreaView>
  );
}