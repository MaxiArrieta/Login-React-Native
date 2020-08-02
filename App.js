import 'react-native-gesture-handler';
//Importes necesarios para usar native base
import React, { useEffect, useState } from 'react';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Root } from 'native-base'
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importamos el Context
import UserState from './context/UserState'

// Componentes de paginas
import Login from './views/Login';
import Registrarse from './views/Registrarse';
import Home from './views/Home';


const Stack = createStackNavigator();

const App = () => {
  //Esto es necesario para poder utilizar native-base
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!fontLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Root>
        <UserState>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: "Iniciar Sesion",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Registrarse"
                component={Registrarse}
                options={{
                  title: "Crear Cuenta",
                  headerStyle: {
                    backgroundColor: "#28303B",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Home",
                  headerStyle: {
                    backgroundColor: "#28303B",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserState>
      </Root>
    </>
  );
}

export default App;