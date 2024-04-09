import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ColoresCumple = ({ contactos }) => {
  const calcularColor = (fechaNacimiento) => {
    const fechaNacimientoObj = new Date(fechaNacimiento);
    const hoy = new Date();
    const diferencia = fechaNacimientoObj.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));

    if (dias === 0) {
      return 'green'; // Cumpleaños hoy (verde)
    } else if (dias < 0) {
      return 'red'; // Cumpleaños pasado (rojo)
    } else {
      return 'blue'; // Cumpleaños futuro (azul)
    }
  };

  return (
    <View style={styles.container}>
      {contactos.map((contacto) => (
        <View key={contacto.id} style={[styles.item, { backgroundColor: calcularColor(contacto.fechaNacimiento) }]}>
          <Text style={styles.text}>
            Nombre: {contacto.nombre}{contacto.apellido}{"\n"}
            {calcularColor(contacto.fechaNacimiento) === 'green' ? 'Hoy es su cumpleaños' :
             calcularColor(contacto.fechaNacimiento) === 'red' ? 'Su cumpleaños ya pasó' :
             `Faltan ${Math.ceil((new Date(contacto.fechaNacimiento).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} días para su cumpleaños`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default ColoresCumple;
