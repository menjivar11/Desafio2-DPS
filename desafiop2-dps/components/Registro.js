import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registro = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [confirmarContra, setConfirmarContra] = useState('');

  const handleRegistro = async () => {
    if (!usuario.trim() || !correo.trim() || !contra.trim() || !confirmarContra.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (contra !== confirmarContra) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Guardar los datos del usuario en AsyncStorage
      await AsyncStorage.setItem('usuario', usuario);
      await AsyncStorage.setItem('correo', correo);
      await AsyncStorage.setItem('contra', contra);

      Alert.alert(
        'Éxito',
        'Usuario registrado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => {
              navigation.navigate('Login');
            }
          }
        ]
      );
    } catch (error) {
      console.log('Error al guardar los datos del usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={contra}
        onChangeText={setContra}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry={true}
        value={confirmarContra}
        onChangeText={setConfirmarContra}
      />
      <Button title="Registrarse" onPress={handleRegistro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Registro;
