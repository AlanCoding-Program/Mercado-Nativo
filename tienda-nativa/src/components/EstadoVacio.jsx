import { View, Text } from "react-native";
import Boton from "@/components/Boton";
import { estilos } from "@/styles/styles";

export default function EstadoVacio({ icono, titulo, texto, textoBoton, onPressBoton }) {
    return (
    <View style={estilos.estadoVacio}>
        {icono ? <Text style={estilos.estadoVacioIcono}>{icono}</Text> : null}
        <Text style={estilos.estadoVacioTitulo}>{titulo}</Text>
        {texto ? <Text style={estilos.estadoVacioTexto}>{texto}</Text> : null}
        {textoBoton ? <Boton titulo={textoBoton} onPress={onPressBoton} /> : null}
    </View>
    );
}