import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Container, H1, Button, Text, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
//Importamos el context
import UserContext from '../context/UserContext'
//import AsyncStorage from '@react-native-community/async-storage';

const Registrarse = () => {
  //React Navigation
  const navigation = useNavigation();
  //State del formulario
  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmar, setConfirmar ] = useState('');
  const [mensaje, setMensaje] = useState(null);
  
  //useContext
  const userContext = useContext(UserContext);
  //Propiedades que se extraen del context
  const { crearCuenta } = userContext;
  
  //Cuando el usuario presiona crear cuenta
  const handleSubmit = async () => {
    //validar 
    if (
        nombre.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmar.trim() === ""
    ) {
      //Mostrar error 
      setMensaje('Todos los campos son obligatorios');
      return;
    }  
    //Password al menos 6 caracteres
    if (password.length < 6) {
      setMensaje("El password debe ser minimo de 6 caracteres");
      return;
    }
    //Confirmar password iguales
    if (password !== confirmar) {
      setMensaje("Los passwords no son iguales");
      return;
    }
//   crearCuenta
    let ok = await crearCuenta({ nombre, email, password });
    console.log("--------------------------");
    if (ok) {
      navigation.navigate("Home");
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
        <H1 style={globalStyles.titulo}>Crear Cuenta</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              onChangeText={(text) => setNombre(text)}
              placeholder="Nombre Usuario"
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setConfirmar(text)}
              placeholder="Repetir Password"
            />
          </Item>
        </Form>
        <Button
          square
          block
          style={globalStyles.boton}
          onPress={() => handleSubmit()}
        >
          <Text style={globalStyles.botonTexto}>Registrarse</Text>
        </Button>
        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default Registrarse;
