import { View, Text, TextInput } from "react-native";
import { estilos, colores } from "@/styles/styles";

export default function Buscador({ valor, onCambio }) {
    return (
    <View style={estilos.buscadorContenedor}>
        <Text style={estilos.buscadorIcono}>⌕</Text>
        <TextInput style={estilos.buscador} placeholder="Buscar productos..." placeholderTextColor={colores.textoSecundario} value={valor} onChangeText={onCambio}/>
    </View>
    );
}