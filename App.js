import * as React from 'react';
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/Screens/Login";
import SignUp from "./src/Screens/SingUp";
import Home from "./src/Screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} options={{headerMode: 'none'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
