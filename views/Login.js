import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Container, H1, Button, Text, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
//Importamos el context
import UserContext from '../context/UserContext'

const Login = () => {

    //React Navigation
  const navigation = useNavigation();
  
  //useContext
  const userContext = useContext(UserContext);
  //Propiedades que se extraen del context
  const { iniciarSesion } = userContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  
  const handleSubmit = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setMensaje('Todos los campos son obligatorios');
    }
    let ok = await iniciarSesion({ email, password });
    console.log('--------------------------');
    if(ok){
      navigation.navigate('Home');
    }
  }
    //Muestra un mensaje de error 
  //En caso de que ingresen mal los datos
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000
    })
  }

  return (
    <Container
      style={[globalStyles.contenedor, { backgroundColor: "#28303B" }]}
    >
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Iniciar Sesion</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              autoCompleteType="email"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
        </Form>
        <Button
          square
          block
          style={globalStyles.boton}
          onPress={() => handleSubmit()}
        >
          <Text style={globalStyles.botonTexto}>Iniciar Sesion</Text>
        </Button>
        <Text
          onPress={() => navigation.navigate("Registrarse")}
          style={globalStyles.enlace}
        >
          Crear Cuenta
        </Text>
        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
}

export default Login;
