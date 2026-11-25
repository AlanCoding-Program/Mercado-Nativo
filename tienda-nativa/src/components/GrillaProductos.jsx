// src/components/GrillaProductos.jsx
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import ProductoCard from "@/components/ProductoCard";
import { useFavoritos } from "@/context/FavoritosContext";
import { useAgregarAlCarrito } from "@/hooks/useAgregarAlCarrito";
import { estilos } from "@/styles/styles";

export default function GrillaProductos({ productos, encabezado, vacio }) {
    const router = useRouter();
    const { alternarFavorito, esFavorito } = useFavoritos();
    const agregar = useAgregarAlCarrito();
    
    return (
    <FlatList 
        data={productos}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={estilos.filaProductos}
        contentContainerStyle={estilos.catalogo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={encabezado}
        ListEmptyComponent={vacio}
        renderItem={({ item }) => (

        <ProductoCard 
            producto={item}
            onPress={() => router.push(`/detalle/${item.id}`)}
            onAgregar={() => agregar(item)}
            esFavorito={esFavorito(item.id)}
            onFavorito={() => alternarFavorito(item)}/>
        )}
    />
    );
}