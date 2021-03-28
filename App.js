import {t} from "./i18n";
import React,{useState} from "react";
import "react-native-gesture-handler";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ShareScreen from "./screens/ShareScreen";
import ChatScreen from "./screens/ChatScreen";
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import  firebase from "./firebase"; 
import "firebase/firestore";


const Stack = createStackNavigator();
const globalScreenOptions={
  headerTransparent: true,
  headerStyle:{backgroundColor:"transparent",
  borderBottomWidth: 0},
  headerTitleStyle:{color:"black"},    
  headerTintColor:"black",
  tabBarVisible: false,
};


export default function App() {
  return (   
        <NavigationContainer>
          <Stack.Navigator screenOptions = {globalScreenOptions}>
            <Stack.Screen 
              name ="Sort"
              component = {LoginScreen}/>
            <Stack.Screen 
              name ="Register" 
              component = {RegisterScreen}/>
            <Stack.Screen 
              name ="Home"
              component = {HomeScreen}/>
            <Stack.Screen 
              name ="Chat"
              component = {ChatScreen}/>       
          </Stack.Navigator>   
        </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

