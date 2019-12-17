import  React, { useState, useEffect, useReducer, useCallback } from 'react';
import { ScrollView,Text, View,Image, KeyboardAvoidingView, StyleSheet, Button,TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { RectButton } from 'react-native-gesture-handler';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
          ...state.inputValues,
          [action.input]: action.value  

      };
      const updatedValidities = {
          ...state.inputValidities,
          [action.input]: action.isValid 
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities){
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
          formIsValid: updatedFormIsValid,
          inputValidities: updatedValidities,
          inputValues: updatedValues
      };   
    }
    return state;
};

const SignUpScreen =  props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    
    const [formState, dispatchFormState] = useReducer(formReducer,{
        inputValues: {
            email:'',
            password:'',
        }, 
        inputValidities: {
            email: false,
            password: false,
          }, 
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{ text: 'Okay'}]);
        }
    }, [
        error
    ]);

    const authHandler = async () => {
        let action;
       if (isSignup) {
        action =
            authActions.signup(
            formState.inputValues.email, 
            formState.inputValues.password,
            );
            } else {
          action = authActions.login(
        formState.inputValues.email, 
        formState.inputValues.password,
        );
       }
       setError(null);
       setIsLoading(true);
       try {
        await dispatch(action);
        props.navigation.navigate('Shop');
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
     dispatchFormState({
         type: FORM_INPUT_UPDATE, 
         value: inputValue, 
         isValid: inputValidity,
         input:inputIdentifier
     });
 },
 [dispatchFormState]
 );


//     return ( 
//     <KeyboardAvoidingView 
//     behavior='padding' 
//     keyboardVerticalOffset={50}
//     style={styles.screen}>
//     <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
//        <View style={{alignItems:'center'}}>
//        <View>
//         <Image style={styles.avatar}
//                   source={require('../../assets/user.png')}/>
//         </View>
//         <View>
//         <Text style={styles.name}>My Account</Text>
//        </View>
//        <View>
//         <Text style={styles.name2}>Login</Text>
//        </View>
//        </View>
       
//         <Card style={styles.authContainer}>
//         <ScrollView>
//             <Input 
//             id='email' 
//             label="E-Mail" 
//             keyboardType='email-address'
//             required
//             email    
//             autoCapitalize="none"
//             errorText="Please enter a valid email address."   
//             onInputChange={inputChangeHandler}
//             initialValue=""
//              />  
//              <Input 
//             id='password' 
//             label="Password" 
//             keyboardType="default"
//             secureTextEntry
//             required
//             minLength={5}   
//             autoCapitalize="none"
//             errorText="Please enter a valid  password."   
//             onInputChange={inputChangeHandler}  
//             initialValue=""
//              />  
//              <View style={styles.buttonContainer}>
//              {isLoading ? (
//                  <ActivityIndicator size="small" color={Colors.primary} />
//              ) : (   
//             <Button 
//              title={isSignup ? 'Sign up' : 'Login'} 
//              color={Colors.primary} 
//              onPress={authHandler} 
//              />
//              )}
//              </View>
//              <View style={styles.buttonContainer}>
//              <Button 
//              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
//              color={Colors.accent} 
//              onPress={() => {
//                  setIsSignup(prevState => !prevState);
//              }} 
//              />
//              </View>
//        </ScrollView>
//         </Card>
//         </LinearGradient>
//         </KeyboardAvoidingView>
//     );
// };
return(
 <KeyboardAvoidingView 
    behavior='padding' 
    keyboardVerticalOffset={200}
    style={styles.screen}>
    <View style={styles.gradient}>
    <View style={styles.authContainer}>
    <ScrollView>
            <Input 
            id='email' 
            label="E-Mail" 
            keyboardType='email-address'
            required
            email    
            autoCapitalize="none"
            errorText="Please enter a valid email address."   
            onInputChange={inputChangeHandler}
            initialValue=""
             />  
             <Input 
            id='password' 
            label="Password" 
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}   
            autoCapitalize="none"
            errorText="Please enter a valid  password."   
            onInputChange={inputChangeHandler}  
            initialValue=""
             />  
             <View style={styles.buttonContainer}>
             {isLoading ? (
                 <ActivityIndicator size="small" color={Colors.primary} />
             ) : (   
    <TouchableOpacity style={styles.loginButton} onPress={authHandler} >
           <Text style={styles.loginText}>{isSignup ? 'Sign up' : 'Login'}</Text>
        </TouchableOpacity>
             )}
             </View>
             <View style={styles.buttonContainer}>
             <TouchableOpacity style={styles.loginButton}
             onPress={() => {
                 setIsSignup(prevState => !prevState);
             }} 
             >
             <Text style={styles.loginText}>{`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}</Text>
             </TouchableOpacity>
             </View>
       </ScrollView>
       </View>
       </View>
       </KeyboardAvoidingView>
)
}

SignUpScreen.navigationOptions = {
    headerTitle :'Create Account',
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
    },
    avatar: {
        height: 150,
        width: '65%',
      },
    authContainer: {
        width:'85%',
        maxWidth: 500,
        maxHeight: 400,
        padding:20,
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer: {
       marginTop: 10,
         },
    name:{
        alignItems:'center',
        fontSize: 24,
        color:"#354c6d",
        letterSpacing: 1,
    },
    name2:{
        alignItems:'center',
        fontSize: 26,
        color:"#354c6d",
        marginTop: 20,
        letterSpacing: 1,
    },
    loginButton: {
        backgroundColor: '#354c6d',
        height:45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth:300,
        borderRadius:30,
      },
      loginText: {
        color: 'white',
        fontSize:20,
      },
});

export default SignUpScreen;
