import React from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Keyboard,} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useState, useEffect} from "react";
import {Button, Input} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {db,auth} from "../firebase";

const LoginScreen=({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    useEffect(() => {
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
            if(authUser){
                navigation.replace("Home");                
            }
        });
        return unsubscribe;
    }, []);
      
    const signIn=()=>{
        auth
            .signInWithEmailAndPassword(email,password)
            .catch((error)=>alert(error.message));
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
        <StatusBar style="light"/>
            <View style={styles.backgroundContainer}> 
                <Image style={styles.bakcgroundImage} source={require('./src/pexels-guilherme-almeida-1858175.jpg')} />
            </View>
            <Animatable.Text
            style={styles.titleText}
            animation='fadeInUp'
            delay={1200}
            >
            TBD.
            </Animatable.Text>
            <Animatable.Text
            style={styles.subtitleText}
            animation='flipInX'
            delay={2000}
            >
            Make the world a better place.
            </Animatable.Text>
            <View style={styles.bottomView}>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.inputView}>
                <Icon
                style={styles.inputIcon}
                name='person'
                type='ionicons'
                color='#5352ed'
                />
                <TextInput
                style={styles.input}
                placeholder='@Email'
                autoCapitalize='none'
                value={email}
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText ={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputView}>
                <Icon
                style={styles.inputIcon}
                name='lock'
                type='ionicons'
                color='#5352ed'
                />
                <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                secureTextEntry={true}
                autoCapitalize='none'
                onChangeText ={(text)=>setPassword(text)}
                onSubmitEditing={signIn} 
                />
            </View>
            <TouchableOpacity style={styles.opacity} >
            <Button style={styles.loginButton} 
                    onPress={signIn}
                    title="Login"
                    />                
            </TouchableOpacity>
            <TouchableOpacity>
            <Button style={styles.loginButton}
                    onPress={()=> navigation.navigate("Register")}
                    containerStyle={styles.button} 
                    type="outline" 
                    title="Register"/>            
            </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}
export default LoginScreen;
const styles = StyleSheet.create({
  opacity:{
    marginVertical:20,
  },
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.1,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 70,
    fontStyle:"italic",
    textShadowColor: 'purple',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
  },
  subtitleText:{
    fontSize: 20,
    position: 'absolute',
    top: 165,
    alignSelf: 'center',
    color: '#fff',
    
  },
  bottomView: {
    backgroundColor: '#313344',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    color:"#c9c9c9",    
    fontSize: 24,
    marginTop: 1,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    paddingVertical: 10,
    borderRadius: 40,
    paddingHorizontal:"4",
  },
  loginButtonText: {
    color: '#fff',
    
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#5352ed',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }, 
  bakcgroundImage: {
      flex: 1, 
      width: null, 
      height: null,
      marginTop: -100,
  },
});
