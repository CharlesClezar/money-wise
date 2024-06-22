import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

export default function SignUp ({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSingUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Home', { idUser: user.uid });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.loginText}>
        Já possui login? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Faça login aqui.</Text>
      </Text>

      <TextInput style={styles.input} placeholder="Insira seu nome" />
      <TextInput style={styles.input} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={(val) => {setEmail(val)}}/>
      <TextInput style={styles.input} placeholder="Crie uma senha" secureTextEntry value={password} onChangeText={(val) => {setPassword(val)}}/>

      <TouchableOpacity style={styles.button} onPress={ handleSingUp }>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2ecc71',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  loginLink: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});