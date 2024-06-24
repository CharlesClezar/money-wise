import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { openDB, fetchCategorias, insertCategoria, updateCategoria, deleteCategoria } from '../../../db';
import Icon  from 'react-native-vector-icons/MaterialIcons';

export default function Categoria({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');
  const [newDescricao, setNewDescricao] = useState('');
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [editingNome, setEditingNome] = useState('');
  const [editingDescricao, setEditingDescricao] = useState('');

  useEffect(() => {
    const loadCategorias = async () => {
      const db = await openDB();
      const fetchedCategorias = await fetchCategorias(db);
      setCategorias(fetchedCategorias);
    };
    loadCategorias();
  }, []);

  const handleAddCategoria = async () => {
    if (!newCategoria) {
      Alert.alert('Erro', 'Por favor, insira um nome para a categoria.');
      return;
    }
    const db = await openDB();
    const descricao = newDescricao; // utiliza a descrição fornecida
    const datahora = new Date().toISOString(); // obtém a data e hora atual
    await insertCategoria(db, newCategoria, descricao, datahora);
    setNewCategoria('');
    setNewDescricao('');
    const fetchedCategorias = await fetchCategorias(db);
    setCategorias(fetchedCategorias);
  };

  const handleEditCategoria = async () => {
    if (!editingNome) {
      Alert.alert('Erro', 'Por favor, insira um nome para a categoria.');
      return;
    }
    const db = await openDB();
    const descricao = editingDescricao; // utiliza a descrição fornecida
    await updateCategoria(db, editingCategoria.idcategoria, editingNome, descricao);
    setEditingCategoria(null);
    setEditingNome('');
    setEditingDescricao('');
    const fetchedCategorias = await fetchCategorias(db);
    setCategorias(fetchedCategorias);
  };

  const handleDeleteCategoria = async (idcategoria) => {
    const db = await openDB();
    await deleteCategoria(db, idcategoria);
    const fetchedCategorias = await fetchCategorias(db);
    setCategorias(fetchedCategorias);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <TouchableOpacity onPress={() => {
        setEditingCategoria(item);
        setEditingNome(item.nome);
        setEditingDescricao(item.descricao);
      }}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteCategoria(item.idcategoria)}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Categoria"
        placeholderTextColor="#4CAF50"
        value={newCategoria}
        onChangeText={setNewCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#4CAF50"
        value={newDescricao}
        onChangeText={setNewDescricao}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCategoria}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      {editingCategoria && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Categoria"
            placeholderTextColor="#4CAF50"
            value={editingNome}
            onChangeText={setEditingNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#4CAF50"
            value={editingDescricao}
            onChangeText={setEditingDescricao}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleEditCategoria}>
            <Text style={styles.addButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={categorias}
        renderItem={renderItem}
        keyExtractor={(item) => item.idcategoria.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#C8E6C9" onPress={() => navigation.navigate('Home')}/>
        </TouchableOpacity>
        
        <View style={styles.footerButton}>
          <TouchableOpacity style={styles.addButtonMenu}>
            <Icon name="add" size={30} color="#FFF" onPress={() => navigation.navigate('AdicionarLancamento')}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footerButton}>
          <Icon name="paid" size={30} color="#C8E6C9" onPress={() => navigation.navigate('Extrato')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#4CAF50',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editContainer: {
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    color: '#4CAF50',
  },
  editText: {
    color: '#2196F3',
  },
  deleteText: {
    color: '#F44336',
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
  addButtonMenu: {
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
