import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login ({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigation.navigate('Home', { idUser: user.uid });
            const uid = user.uid;
          } else {
            navigation.navigate('Login');
          }
        });
    }, []);
    
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login</Text>

            <Text style={styles.signupText}>
                Não possui conta? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Crie aqui.</Text>
            </Text>

            <TextInput style={styles.input} placeholder="Digite seu e-mail" keyboardType="email-address" value={email} onChangeText={(val) => {setEmail(val)}} />
            <TextInput style={styles.input} placeholder="*****" secureTextEntry value={password} onChangeText={(val) => {setPassword(val)}} />

            <Image
                source={{ uri: 'https://i.ibb.co/myL3VJK/logo-removebg-preview.png' }}
                style={styles.logo}
            />

            <TouchableOpacity style={styles.button} onPress={ handleLogin }>
                <Text style={styles.buttonText}>Login</Text>
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
  signupText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signupLink: {
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
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