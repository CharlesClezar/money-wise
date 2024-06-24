import * as React from 'react';
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/Screens/Login";
import SignUp from "./src/Screens/SingUp";
import Home from "./src/Screens/Home";
import AdicionarLancamento from "./src/Screens/AdicionarLancamento";
import Extrato from "./src/Screens/Extrato";
import Categoria from './src/Screens/Categoria';

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerMode: 'none'}}/>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} options={{headerMode: 'none'}}/>
      <Stack.Screen name="AdicionarLancamento" component={AdicionarLancamento} options={{headerMode: 'none'}}/>
      <Stack.Screen name="Extrato" component={Extrato} options={{headerMode: 'none'}}/>
      <Stack.Screen name="Categoria" component={Categoria} options={{headerMode: 'none'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
