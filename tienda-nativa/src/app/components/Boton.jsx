import { Pressable, Text } from "react-native";
import { estilos } from "../styles/styles";
export default function Boton({titulo, onPress, disabled = false, secundario = false,}) {

  return (
    <Pressable onPress={onPress} disabled={disabled}
    style={[secundario ? estilos.botonSecundario : estilos.boton, disabled && estilos.botonDeshabilitado,]}>
      <Text style={ secundario ? estilos.textoBotonSecundario: estilos.textoBoton}>
        {titulo}
      </Text>
    </Pressable>
  );
}

//Este componente sirve para todos los botones de la aplicación, recibe el texto, la acción y el tipo de botón mediante props