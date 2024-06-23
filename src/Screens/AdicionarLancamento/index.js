import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdicionarLancamento ({ navigation }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.expenseButton}>
          <Text style={styles.buttonText}>Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.incomeButton}>
          <Text style={styles.buttonText}>Receita</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.amount}>0,00 $</Text>
      <TextInput
        style={styles.input}
        placeholder="DESCRIÇÃO"
        placeholderTextColor="#4CAF50"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="CATEGORIA"
        placeholderTextColor="#4CAF50"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="DATA"
        placeholderTextColor="#4CAF50"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  amount: {
    fontSize: 30,
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 20,
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
});