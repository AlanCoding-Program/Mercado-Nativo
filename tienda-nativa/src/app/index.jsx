import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Cargando from "@/components/Cargando";
import EstadoVacio from "@/components/EstadoVacio";
import Buscador from "@/components/Buscador";
import FiltroCategorias from "@/components/FiltroCategorias";
import GrillaProductos from "@/components/GrillaProductos";
import BarraInferior from "@/components/BarraInferior";
import { useProductos } from "@/hooks/useProductos";
import { useFiltroProductos } from "@/hooks/useFiltroProductos";
import { estilos } from "@/styles/styles";

export default function PantallaPrincipal() {
  const { productos, cargando, error, recargar } = useProductos();
  const {
    busqueda, setBusqueda, categorias,
    categoriaSeleccionada, setCategoriaSeleccionada, productosFiltrados,
  } = useFiltroProductos(productos);

  // Es un ELEMENTO (no un componente definido acá adentro): así el TextInput no pierde el foco al escribir.
  const encabezado = (
    <View>
      <Text style={estilos.titulo}>Descubrí nuestros productos</Text>
      <Text style={estilos.subtitulo}>Encontrá lo que estás buscando.</Text>
      <Buscador valor={busqueda} onCambio={setBusqueda} />
      <View style={estilos.seccionCategorias}>
        <Text style={estilos.tituloSeccion}>Categorías</Text>
        <FiltroCategorias
          categorias={categorias}
          seleccionada={categoriaSeleccionada}
          onSeleccionar={setCategoriaSeleccionada}
        />
      </View>
      <Text style={estilos.tituloSeccion}>Todos los productos</Text>
    </View>
  );

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header/>
      
      {cargando ? ( <Cargando texto="Cargando productos..." />) : error ? (
        <EstadoVacio titulo="No pudimos cargar el catálogo" texto={error} textoBoton="Reintentar" onPressBoton={recargar}/>
      ) : (
      <GrillaProductos
          productos={productosFiltrados}
          encabezado={encabezado}
          vacio={
            <EstadoVacio titulo="No encontramos productos" texto="Probá con otra búsqueda o categoría."/>
          }
      />
      )}

      <BarraInferior activa="inicio" />
    </SafeAreaView>
  );
}
