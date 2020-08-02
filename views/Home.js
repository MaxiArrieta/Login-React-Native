import React, { useContext } from 'react'
import { View } from "react-native";
//importamos componenetes de native base
import { Container, H1, Button, Text } from "native-base";
//Importamos los estilos
import globalStyles from "../styles/global";
//Importamos el context
import UserContext from '../context/UserContext'
//Importamos useNavigation para cerrar sesion
import { useNavigation } from "@react-navigation/native";


const Home = () => {

      const navigation = useNavigation();

    //useContext
    const userContext = useContext(UserContext);
    //Propiedades que se extraen del context
    const { usuario, cerrarSesion } = userContext;
    console.log('usuario: ', usuario);

    const handleSubmit = () => {
        cerrarSesion();
        navigation.goBack();   
    }

    return (
      <Container
        style={[globalStyles.contenedor, { backgroundColor: "#28303B" }]}
      >
        <View style={globalStyles.contenido}>
          <H1 style={globalStyles.titulo}>Bienvenido {usuario.nombre}</H1>
          <Button
            square
            block
            style={globalStyles.boton}
            onPress={() => handleSubmit()}
          >
            <Text style={globalStyles.botonTexto}>Cerrar Sesion</Text>
          </Button>
        </View>
      </Container>
    );
}

export default Home;
