// screens/HomeScreen.js
import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { openDB, selecionaSaldo } from '../../../db'; 
import Icon  from 'react-native-vector-icons/MaterialIcons';
import TopMenuBar from '../../../components/Menu/Menu';

export default function Home ({ navigation }) {
  const [saldo, setSaldo] = useState(0);

  const fetchSaldo = async () => {
    const db = await openDB();
    const saldoAtual = await selecionaSaldo(db);
    setSaldo(saldoAtual);
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSaldo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TopMenuBar />
      <View style={styles.header}>
        <Image source={{uri: 'https://i.ibb.co/cvfp0PW/Captura-de-tela-2024-06-23-160856.png'}} style={styles.header}/>
      </View>

      <View style={styles.userInfo}>
        <Image 
          source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
          style={styles.userIcon}
        />
        <Text style={styles.userName}>
          Olá, seja bem vindo!
        </Text>

      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>SEU SALDO ATUAL É:</Text>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceAmount}>{saldo.toFixed(2)} $</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Categoria')}>
        <Text style={styles.categoryButtonText}>Adicionar Categoria</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#C8E6C9"/>
        </TouchableOpacity>
        
        <View style={styles.footerButton}>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={30} color="#FFF" onPress={() => navigation.navigate('AdicionarLancamento')}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footerButton}>
          <Icon name="paid" size={30} color="#C8E6C9" onPress={() => navigation.navigate('Extrato')}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '70%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C853',
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    color: '#000',
    marginTop: 10,
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  balanceText: {
    fontSize: 18,
    color: '#00C853',
    fontWeight: 'bold',
  },
  balanceBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    flexDirection: 'row',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#8F8E8E',
  },
  addButton: {
    backgroundColor: '#00C853',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
  categoryButton: {
    marginTop: 20,
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  categoryButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});