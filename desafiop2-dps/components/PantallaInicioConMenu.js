import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

import Inicio from './Inicio';
import AgregarCon from './AgregarCon';
import CerrarSesion from './CerrarSesion';

const Drawer = createDrawerNavigator();

const PantallaInicioConMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen
          name="Contactos"
          component={Inicio}
          options={{
            drawerLabel: '',
          }}
        />
        <Drawer.Screen
          name="AgregarContacto"
          component={AgregarCon}
          options={{ drawerLabel: 'Agregar Contacto' }}
        />
        <Drawer.Screen
          name="CerrarSesion"
          component={CerrarSesion}
          options={{ drawerLabel: 'Cerrar Sesion' }}
        />
      </Drawer.Navigator>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate('AgregarContacto');
        }}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PantallaInicioConMenu;
