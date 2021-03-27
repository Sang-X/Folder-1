import {Ionicons} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import {CountDown} from 'react-native-customizable-countdown';
import React,{useLayoutEffect,useState,useRef} from 'react';
import {StyleSheet,Text,View,TextInput,KeyboardAvoidingView,SafeAreaView,ScrollView,Platform,StatusBar,Keyboard,TouchableOpacity,TouchableWithoutFeedback,LogBox }from "react-native";
import {auth,db} from "../firebase";

const ChatScreen=({navigation,route})=> {
    /*
        const[input,setInput]=useState("");
        const[messages,setMessages]=useState([]);
    */
    
    useLayoutEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']),
        navigation.setOptions({
            title:"Make their day...",
            headerTitleAlign:"center",
            headerRight:()=>(
                <View style={{marginRight:10}}>     
                </View>
            ),
        });
    },[navigation, messages]);
    /*
    const sendMessage=()=>{
        Keyboard.dismiss();
        db
            .collection("messages")
            .add({
                message:input,
            });
            setInput("");
    };
   */
  /*
useLayoutEffect(() => {
    const unsubscribe=db 
        .collection("chats")
        //.doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp","asc")
        .onSnapShot((snapshot)=>setMessages(
            snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            }))
        ));
    return unsubscribe;
},[route]);
    */ 
  const wobbleAnimRef=useRef();
    return(
        <SafeAreaView style = {{flex : 1}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container }
                keyboardVerticalOffset={-2}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            
                            {messages.map(({id,data})=>
                                data.email === auth.currentUser.email?(
                                    <View key={id} style={styles.receiver}>
                                        <Text style ={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ):(
                                    <View style={styles.sender}>
                                        <Text style ={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            )}
                            
                        </ScrollView>                                                                                           
                        <View style={styles.footer}>
                            <TextInput
                                multiline
                                value={input}
                                onChangeText={(text)=>setInput(text)}
                                autoCorrect={true}
                                //onSubmitEditing={sendMessage}
                                placeholder="Say something..."
                                style={styles.textInput}/>
                                    <Animatable.View ref ={wobbleAnimRef}>
                                        <TouchableOpacity
                                            onPress={()=>{wobbleAnimRef.current.wobble(700);sendMessage();}}>
                                            <Text style={styles.animButton}></Text>
                                            <Ionicons name="send" 
                                            size={30} 
                                            colour="#8b82d5"/>
                                        </TouchableOpacity>      
                                    </Animatable.View>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default ChatScreen;
const styles=StyleSheet.create({
    container:{
        flex:1,
        color:"#2f2f31",
        backgroundColor:"#586162",
    },
    footer:{
        flexDirection:"row",
        alignItems:"flex-end",
        width:"100%",
        padding:5,
        bottom :15,
        flex:1,
    },
    textInput:{
        bottom: -9,
        flex: 1,
        marginRight:15,
        backgroundColor:"#e2e2e2",
        padding:10,
        color:"black",
        borderRadius:25,
    },
    sender:{
        padding:15,
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",        
    },
    receiver:{
        padding:15,
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
});

