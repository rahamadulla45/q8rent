import  React from 'react';
import { ScrollView,Text, View,Image,Platform,TouchableNativeFeedback,
    KeyboardAvoidingView, StyleSheet, Button,TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

const LangScreen = props => {
    const selectItemHandler = () => {
        props.navigation.navigate('Main');
    };
 return (
 <View style={styles.centered}>
 <Image style={styles.avatar} source={require('../../assets/q8rent.png')}  />
 
 <View style={styles.inputContainer}>
 <Text style={styles.title}>CHOOSE YOUR LANGUAGE</Text>


<View style={styles.buttonContainer}>
        <View style={styles.button}>
        <TouchableOpacity onPress={selectItemHandler}  style={{backgroundColor:'#fff',height:30,width:120,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'}}>
            <Text style={{color:'#354c6d',fontSize:18,textAlign:'center'}}>ENGLISH</Text>
            </TouchableOpacity>
    </View>
    <View style={styles.button}>
    <TouchableOpacity style={{backgroundColor:'#fff',height:30,width:120,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'}}>
            <Text style={{color:'#354c6d',fontSize:18,textAlign:'center'}}>ARABIC</Text>
            </TouchableOpacity>
    </View>
</View>
    </View>


</View>
 )
};
LangScreen.navigationOptions = {
     header:null,
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        backgroundColor:'#354c6d',
        alignItems:'center',
        justifyContent:'center'

    },
    avatar: {
        width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    backgroundColor:'#fff'
 
      },
      title:{
        fontSize: 16,
        marginVertical:10,
        color:'#fff'
        },
      avatar2: {
        height: 150,
        width:'55%',
      },
      gradient:{
        flex:1,
        alignItems:'center',
    },
    gradient1:{
        alignItems:'center',
    },
    
    name:{
        alignItems:'center',
        fontSize: 20,
        fontWeight:'bold',
        color:"#354c6d",
        letterSpacing: 1,
        bottom:25
    },
    name2:{
        alignItems:'center',
        fontSize: 20,
        fontWeight:'bold',
        color:"#354c6d",
        letterSpacing: 1,
        bottom:28
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15,
        top:10
    },
    button:{
        width:100,
},
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
        top:30
    },
})
export default LangScreen;
