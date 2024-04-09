import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColoresCumple from './ColoresCumple';

const Inicio = ({ navigation }) => {
  const [contactos, setContactos] = useState([]);

  const cargarContactos = useCallback(async () => {
    try {
      const contactosGuardados = await AsyncStorage.getItem('contactos');
      if (contactosGuardados) {
        setContactos(JSON.parse(contactosGuardados));
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarContactos();
    });

    return unsubscribe;
  }, [navigation, cargarContactos]);

  const calcularColor = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaCumple = new Date(fechaNacimiento);
    fechaCumple.setFullYear(hoy.getFullYear()); // Establecer el año de cumpleaños igual al año actual
    const diferencia = fechaCumple.getTime() - hoy.getTime();
    const diasHastaCumple = Math.ceil(diferencia / (1000 * 3600 * 24));

    if (diasHastaCumple === 0) {
      return { color: 'green', mensaje: '¡Hoy es su cumpleaños!' };
    } else if (diasHastaCumple < 0) {
      return { color: 'red', mensaje: `Pasado`};
    } else {
      return { color: 'blue', mensaje: `Faltan ${diasHastaCumple} días para su cumpleaños` };
    }
  };

  const handleEliminarContacto = async (id) => {
    try {
      const contactosActualizados = contactos.filter((contacto) => contacto.id !== id);
      await AsyncStorage.setItem('contactos', JSON.stringify(contactosActualizados));
      setContactos(contactosActualizados);
      Alert.alert('Éxito', 'Contacto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el contacto. Por favor, intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactoContainer, { backgroundColor: calcularColor(item.fechaNacimiento).color }]}
            onLongPress={() => {
              Alert.alert(
                'Eliminar Contacto',
                `¿Estás seguro que deseas eliminar a ${item.nombre}?`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Eliminar', onPress: () => handleEliminarContacto(item.id) },
                ]
              );
            }}
          >
            <View>
              <Text style={styles.contactoNombre}>{item.nombre} {item.apellido}</Text>
              <Text style={styles.contactoDetalle}>{calcularColor(item.fechaNacimiento).mensaje}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text>No hay contactos</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  contactoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  contactoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactoDetalle: {
    fontSize: 16,
  },
});

export default Inicio;
