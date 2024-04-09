import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogin from './components/Login';
import PantallaRegistro from './components/Registro';
import PantallaInicioConMenu from './components/PantallaInicioConMenu';
import PantallaInicio from './components/Inicio';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={PantallaLogin} />
        <Stack.Screen name="Registro" component={PantallaRegistro} />
        <Stack.Screen name="PantallaInicioConMenu" component={PantallaInicioConMenu} />
        <Stack.Screen name="Inicio" component={PantallaInicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
