//El encabezado va a mostrar el nombre de la tienda y la cantidad de productos que hay en el carrito.
import { View, Text, Pressable, StyleSheet } from "react-native";
export default function Header({
  titulo = "Mercado Nativo",
  cantidad = 0,
  onPressCarrito,
}) {
  return (
    <View style={styles.contenedor}>
      <View>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>Todo lo que necesitás, en un solo lugar</Text>
      </View>

      <Pressable
        style={styles.carrito}
        onPress={onPressCarrito}
      >
        <Text style={styles.icono}>🛒</Text>

        {cantidad > 0 && (
          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>{cantidad}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
  },
  titulo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#17365D",
  },
  subtitulo: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
  },
  carrito: {
    backgroundColor: "#E6F2FF",
    padding: 12,
    borderRadius: 14,
    position: "relative",
  },
  icono: {
    fontSize: 23,
  },
  contador: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#208AEF",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  contadorTexto: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
