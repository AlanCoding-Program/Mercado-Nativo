import { View, Text, ActivityIndicator } from "react-native";
import { estilos } from "@/styles/styles";

export default function Cargando({ texto = "Cargando..." }) {
    return (
    <View style={estilos.carga}>
        <ActivityIndicator size="large" />
        <Text style={estilos.textoSecundario}>{texto}</Text>
    </View>
    );
}