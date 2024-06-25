import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { openDB, fetchExtratos, deleteExtrato } from '../../../db';

export default function Extrato ({ navigation }) {
  const [extratos, setExtratos] = useState([]);

  const loadExtratos = async () => {
    const db = await openDB();
    const extratosData = await fetchExtratos(db);
    setExtratos(extratosData);
  };

  useEffect(() => {
    loadExtratos();
  }, []);

  const handleDelete = async (id) => {
    const db = await openDB();
    await deleteExtrato(db, id);
    loadExtratos();
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este extrato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(id) },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View
        style={[
          styles.bar,
          { backgroundColor: item.tipo === 'Receita' ? '#2196F3' : '#F44336' },
        ]}
      />
      <Text style={styles.itemText}>{item.valor.toFixed(2)} $</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.idextrato)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>ENTRADAS X SAÍDAS</Text>
        <Image
          source={{ uri: 'https://example.com/icon.png' }}
          style={styles.icon}
        />
      </View>
      <FlatList
        data={extratos}
        renderItem={renderItem}
        keyExtractor={item => item.idextrato.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#C8E6C9" onPress={() => navigation.navigate('Home')}/>
        </TouchableOpacity>
        
        <View style={styles.footerButton}>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={30} color="#FFF" onPress={() => navigation.navigate('AdicionarLancamento')}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footerButton}>
          <Icon name="paid" size={30} color="#C8E6C9" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  bar: {
    height: 10,
    width: 100,
    marginRight: 10,
  },
  itemText: {
    color: '#4CAF50',
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
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
});