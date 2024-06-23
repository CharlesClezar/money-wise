import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or any other icon set

const TopMenuBar = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#00C853" barStyle="default" />

        <TouchableOpacity>
            <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.icon}>
                <Icon name="notifications-outline" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon}>
                <Icon name="share-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <Icon name="search-outline" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#888',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
});

export default TopMenuBar;
