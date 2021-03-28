import {StatusBar} from "expo-status-bar";
import React, {useLayoutEffect,useState,useEffect} from "react";
import {Button,Avatar} from "react-native-elements";
import {StyleSheet,SafeAreaView,View,TouchableOpacity} from "react-native";
import {FloatingButton,FloatingButtonChild} from "react-native-action-floating-button";
import { Feather } from "@expo/vector-icons";
import { Image } from 'react-native';
import {auth, db} from "../firebase";

const HomeScreen=({navigation})=>{   
    const [chats,setChats]=useState([]);
    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace ("Login");
        });
    };
    useEffect(() => {
        const unsubscribe=db.collection("chats").onSnapshot(snapshot=>
            setChats(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        );
        return unsubscribe;
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Varsie.",
            headerTitleAlign:"center",
            borderBottomWidth: 0,       
            headerLeft:()=>(
                <View style={styles.avatar}>
                    <TouchableOpacity  onPress= {signOutUser} activeOpacity ={0.09}>
                        <Avatar source={{uri:"https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-93-1183723.png"}} size={25} rounded 
                                />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=>(
                <View style={styles.mavatar}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("Chat")} 
                        activeOpacity ={0.9}>
                        <Avatar size={40} rounded source ={{uri:"https://i.pinimg.com/originals/3f/7c/f5/3f7cf5709cd374168c49728ecbbb25e5.jpg"}}/>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    return(
        <SafeAreaView style = {{flex : 1}}>
                <StatusBar style= "light"/>
                <View style={styles.backgroundContainer}> 
                    <Image style={styles.bakcgroundImage} source={require('./src/pexels-mudassir-ali-5227427.jpg')} />
                </View>
                <Carousel data = {dummyData}/>
                    <View> 
                        <View style={styles.button}>
                            <Button containerStyle={styles.button5} onPress={()=> navigation.navigate("Chat")} title="Start_Chat"/>
                        </View>
                        <View style = {{flex : 1}}>
                            <FloatingButton style={styles.floater} hasChildren={true}
                                icon={<Feather name="activity" size={24} color="#392b55"/>}
                                backgroundColor="#ff82c6">
                                <FloatingButtonChild onPress={()=>navigation.navigate("Share")}backgroundColor="#af589a" >
                                    {<Feather name="share-2" size={21} color="#693e74" />}
                                </FloatingButtonChild>
                                <FloatingButtonChild onPress={()=>navigation.navigate("About")}backgroundColor="#693e74" >
                                    {<Feather name="file-text" size={18} color="#af589a" />}
                                </FloatingButtonChild>
                                <FloatingButtonChild onPress={()=>navigation.navigate("Customise")}backgroundColor="#392b55" >                    
                                    {<Feather name="settings" size={15} color="#ff82c6" />}
                                </FloatingButtonChild>
                            </FloatingButton>              
                        </View>
                    </View>
        </SafeAreaView>
    ); 
};
export default HomeScreen;
const styles =StyleSheet.create({
    button:{
        position:"absolute",
        alignSelf:"center",
        bottom:-300,
        width:100,
            
    },
    floater:{
        position:"absolute",
        alignSelf:"center",
        bottom:100,
    },
    button5:{
        borderRadius:12,
    },
    avatar:{
        marginLeft:10,
    },
    mavatar:{
        marginRight:10,
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
        opacity:0.9,
    },
});
