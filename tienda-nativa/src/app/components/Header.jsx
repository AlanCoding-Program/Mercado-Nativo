import { View, Text, Pressable } from "react-native";
import { estilos } from "../styles/styles";
export default function Header({titulo = "Mercado Nativo", cantidad = 0, onPressCarrito, onPressFavoritos,}) {

  return (
    <View style={estilos.encabezado}>
      <View style={estilos.encabezadoInfo}>
        <Text style={estilos.nombreTienda}>{titulo}</Text>
        <Text style={estilos.descripcionTienda}>Todo lo que necesitás, en un solo lugar</Text>
      </View>

      <Pressable style={estilos.botonIcono} onPress={onPressFavoritos}>
        <Text style={estilos.icono}>♡</Text>
      </Pressable>

      <Pressable style={estilos.botonIcono} onPress={onPressCarrito}>
        <Text style={estilos.icono}>🛒</Text>
        {cantidad > 0 && (
          <View style={estilos.contador}>
            <Text style={estilos.contadorTexto}> {cantidad}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

//Aca esta el encabezado de la aplicacion, muestra el nombre de la tienda, accesos al carrito y favoritos