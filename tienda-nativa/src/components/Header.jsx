import { useRouter } from "expo-router";
import { useCarrito } from "@/context/CarritoContext";
import { estilos } from "@/styles/styles";

export default function Header({ titulo = "Mercado Nativo" }) {
  const router = useRouter();
  const { cantidadTotal } = useCarrito();

  return (
    <View style={estilos.encabezado}>
      <View style={estilos.encabezadoInfo}>
        <Text style={estilos.nombreTienda}>{titulo}</Text>
        <Text style={estilos.descripcionTienda}>Todo lo que necesitás, en un solo lugar</Text>
      </View>

      <Pressable style={estilos.botonIcono} onPress={() => router.push("/favoritos")}>
        <Text style={estilos.icono}>♡</Text>
      </Pressable>

      <Pressable style={estilos.botonIcono} onPress={() => router.push("/carrito")}>
        <Text style={estilos.icono}>🛒</Text>
        {cantidadTotal > 0 && (
          <View style={estilos.contador}>
            <Text style={estilos.contadorTexto}>{cantidadTotal}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}