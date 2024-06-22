// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Image 
            source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>MONEYWISE</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Image 
            source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image 
          source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
          style={styles.userIcon}
        />
        <Text style={styles.userName}>OLÁ, JOÃO</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>SEU SALDO ATUAL É:</Text>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceAmount}>0,00 $</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image 
            source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image 
            source={{uri: 'https://img.ibxk.com.br/materias/5866/21577.jpg?w=700'}} // Altere para o URL do ícone correto
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009688',
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
    color: '#000',
  },
  balanceBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#00C853',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },
  addButtonText: {
    fontSize: 36,
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});


export default Home;
