import { ScrollView, Pressable, Text } from "react-native";
import { estilos } from "@/styles/styles";

export default function FiltroCategorias({ categorias, seleccionada, onSeleccionar }) {
    return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.listaCategorias}>
        {categorias.map((categoria) => {
            const activa = seleccionada === categoria;
            
            return (
            <Pressable key={categoria} style={[estilos.categoria, activa && estilos.categoriaActiva]} onPress={() => onSeleccionar(categoria)}>
                <Text style={[estilos.categoriaTexto, activa && estilos.categoriaTextoActiva]}>
                    {categoria}
                </Text>
            </Pressable>
            );
        })}
    </ScrollView>
    );
}