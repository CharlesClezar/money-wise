import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

const data = [
  { id: '1', type: 'income', value: '50,00' },
  { id: '2', type: 'expense', value: '30,00' },
  { id: '3', type: 'expense', value: '20,00' },
  { id: '4', type: 'income', value: '100,00' },
];

export default function Extrato ({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View
        style={[
          styles.bar,
          { backgroundColor: item.type === 'income' ? '#2196F3' : '#F44336' },
        ]}
      />
      <Text style={styles.itemText}>{item.value}</Text>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={{ uri: 'https://example.com/home_icon.png' }}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={{ uri: 'https://example.com/chart_icon.png' }}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={{ uri: 'https://example.com/settings_icon.png' }}
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});