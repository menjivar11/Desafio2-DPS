import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AgregarCon = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleAgregarContacto = async () => {
    if (!nombre || !apellido || !telefono || !email || !fechaNacimiento) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const nuevoContacto = {
      id: Date.now().toString(),
      nombre,
      apellido,
      telefono,
      email,
      fechaNacimiento: fechaNacimiento.toDateString()
    };

    try {
      const contactosPrevios = await AsyncStorage.getItem('contactos');
      const contactos = contactosPrevios ? JSON.parse(contactosPrevios) : [];
      const contactosActualizados = [...contactos, nuevoContacto];
      await AsyncStorage.setItem('contactos', JSON.stringify(contactosActualizados));
      setNombre('');
      setApellido('');
      setTelefono('');
      setEmail('');
      setFechaNacimiento(null);
     Alert.alert('Éxito', 'Contacto agregado correctamente', [
        {
          text: 'Aceptar',
          onPress: () => {
            navigation.goBack(); // Cambio aquí
          }
        }
      ]);
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar el contacto. Por favor intenta de nuevo.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFechaNacimiento(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.datePickerContainer}>
        <Button title="Seleccionar Fecha de Nacimiento" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      {fechaNacimiento && <Text>Fecha de Nacimiento: {fechaNacimiento.toDateString()}</Text>}
      <Button title="Agregar Persona" onPress={handleAgregarContacto} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AgregarCon;

