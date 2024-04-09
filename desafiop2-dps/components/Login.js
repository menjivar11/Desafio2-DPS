import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PantallaLogin = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      // Obtener los datos del usuario guardados en AsyncStorage
      const savedUsuario = await AsyncStorage.getItem('usuario');
      const savedContra = await AsyncStorage.getItem('contra');

      // Verificar si los datos ingresados coinciden con los guardados
      if (identifier === savedUsuario && password === savedContra) {
        console.log('Inicio de sesión exitoso.');
        // Redirigir a la pantalla de citas después de iniciar sesión exitosamente
        navigation.navigate('PantallaInicioConMenu');
      } else {
        Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text style={styles.registerText}>¿No tienes una cuenta? <Text style={styles.registerLink} onPress={() => navigation.navigate('Registro')}>Registrarse</Text></Text>
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
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PantallaLogin;
