import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { openDB, insertExtrato, fetchCategorias } from '../../../db'; 

export default function AdicionarLancamento ({ navigation }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState('Receita');
  const [categorias, setCategorias] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadCategorias = async () => {
        const db = await openDB();
        const fetchedCategorias = await fetchCategorias(db);
        const formattedCategorias = fetchedCategorias.map(categoria => ({
          label: categoria.nome,
          value: categoria.idcategoria
        }));
        setCategorias(formattedCategorias);
    };

    loadCategorias();
  }, []); // Chama apenas uma vez no carregamento inicial

  const handleInsert = async () => {
    if (!description || !selectedCategory || !amount || !selectedType) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione o tipo (Despesa ou Receita).');
      return;
    }

    const db = await openDB();
    const currentDate = new Date().toISOString();
    await insertExtrato(db, description, selectedType, selectedCategory, currentDate, parseFloat(amount));
    Alert.alert('Sucesso', 'Lançamento adicionado com sucesso.');
    navigation.goBack(); // Navega de volta após a inserção
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.incomeButton, selectedType === 'Receita' ? styles.selectedButton : styles.disabledButton]}
          onPress={() => setSelectedType('Receita')}
          disabled={selectedType === 'Receita'} 
        >
          <Text style={styles.buttonText}>Receita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.expenseButton, selectedType === 'Despesa' ? styles.selectedButton : styles.disabledButton]}
          onPress={() => setSelectedType('Despesa')}
          disabled={selectedType === 'Despesa'} 
        >
          <Text style={styles.buttonText}>Despesa</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="VALOR"
        placeholderTextColor="#4CAF50"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="DESCRIÇÃO"
        placeholderTextColor="#4CAF50"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Selecione a Categoria:</Text>
        <DropDownPicker
          open={open}
          value={selectedCategory}
          items={categorias}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          setItems={setCategorias}
          placeholder="Selecione uma categoria..."
          containerStyle={{ height: 40, marginBottom: 10 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleInsert}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={30} color="#C8E6C9" onPress={() => navigation.navigate('Home')}/>
        </TouchableOpacity>

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
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  expenseButton: {
    backgroundColor: '#F44336',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  incomeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
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
  footerButton: {
    alignItems: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#4CAF50',
    marginBottom: 5,
  },
  selectedButton: {
    opacity: 1, // Botão selecionado com opacidade total
  },
  disabledButton: {
    opacity: 0.3, // Botão desativado com opacidade reduzida
  },
});