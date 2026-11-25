import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import EstadoVacio from "@/components/EstadoVacio";
import GrillaProductos from "@/components/GrillaProductos";
import BarraInferior from "@/components/BarraInferior";
import { useFavoritos } from "@/context/FavoritosContext";
import { estilos } from "@/styles/styles";

export default function PantallaFavoritos() {
  const router = useRouter();
  const { favoritos } = useFavoritos();

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header/>
      <GrillaProductos
        productos={favoritos}
        encabezado={
          <View>
            <Text style={estilos.titulo}>Mis favoritos</Text>
            <Text style={estilos.subtitulo}>Tus productos guardados en un solo lugar.</Text>
          </View>
        }
        vacio={
          <EstadoVacio
            icono="♡"
            titulo="Todavía no tenés favoritos"
            texto="Cuando marques un producto en favoritos, aparecerá acá."
            textoBoton="Explorar productos"
            onPressBoton={() => router.replace("/")}
          />
        }
      />
      <BarraInferior activa="favoritos" />
    </SafeAreaView>
  );
}