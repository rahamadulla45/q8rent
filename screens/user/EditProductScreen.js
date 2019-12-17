import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';  
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { Dropdown } from 'react-native-material-dropdown';

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
        );

    const dispatch = useDispatch();
    
   const [formState, dispatchFormState] = useReducer(formReducer,{
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price:'',
            rentType: editedProduct ? editedProduct.rentType: '',
            country: editedProduct ? editedProduct.country: '',
            region: editedProduct ? editedProduct.region: '',
            city: editedProduct ? editedProduct.city: '',
            rooms: editedProduct ? editedProduct.rooms: '',
            bathrooms: editedProduct ? editedProduct.bathrooms: '',
            phonenumber: editedProduct ? editedProduct.phonenumber: ''
}, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
            rentType: editedProduct ? true : false,
            country: editedProduct ? true : false,
            region: editedProduct ? true : false,
            city: editedProduct ? true : false,
            rooms: editedProduct ? true : false,
            bathrooms: editedProduct ? true : false,
            phonenumber: editedProduct ? true : false,
}, 
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
    if (error){
        Alert.alert('An error occured!', error, [{ text:'Okay'}]);
    }
    }, [error]);

    
   const submitHandler = useCallback(async () => {
       if (!formState.formIsValid) {
           Alert.alert('Wrong Input!','Please check the errors in the form.',[
               {text:'Okay'}
            ]);
           return;
       }
       setError(null);
       setIsLoading(true);
       try{
        if (editedProduct) {
            await dispatch(
                 productsActions.updateProduct(
               prodId, 
               formState.inputValues.title, 
               formState.inputValues.description, 
               formState.inputValues.imageUrl,
               formState.inputValues.rentType,
               formState.inputValues.country,
               formState.inputValues.region,
               formState.inputValues.city,
                )
         );
          } else {
              await dispatch(productsActions.createProduct( 
                  formState.inputValues.title,  
                  formState.inputValues.description,  
                  formState.inputValues.imageUrl, 
                  +formState.inputValues.price,
                  formState.inputValues.rentType,
                  formState.inputValues.country,
                  formState.inputValues.region,
                  formState.inputValues.city,
                  +formState.inputValues.rooms,
                  +formState.inputValues.bathrooms,
                  +formState.inputValues.phonenumber
                  )
              );
          }
          props.navigation.goBack();
    } catch (err) {
        setError(err.message);
       }
    
       setIsLoading(false);
   },[dispatch, prodId, formState]);

   useEffect(() => {
       props.navigation.setParams({ submit: submitHandler });
   }, [submitHandler]);

   
   const inputChangeHandler = useCallback(
       (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: inputValue, 
        isValid: inputValidity,
        input:inputIdentifier
    });
},
[dispatchFormState]);
   
if (isLoading) {
    return (
    <View style={styles.centered}>
    <ActivityIndicator size='large' color={Colors.primary} />
    </View>
    );
}
   return (
    <KeyboardAvoidingView style={{ flex: 1}}
    behavior="padding" 
    keyboardVerticalOffset={100}>
    <ScrollView>
    <View style={styles.form}>
    <Input 
        id="rentType"
        label="Rent Type"
        errorText="Please enter a Valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.rentType: ''}
        initiallyValid={!!editedProduct}
        required
        />
        <Input
        id="country"
        label="Country"
        errorText="Please enter a Valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.country: ''}
        initiallyValid={!!editedProduct}
        required
        />
        <Input
        id="region"
        label="Region"
        errorText="Please enter a Valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.region: ''}
        initiallyValid={!!editedProduct}
        required
        />
        <Input
        id="city"
        label="City"
        errorText="Please enter a Valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.city: ''}
        initiallyValid={!!editedProduct}
        required
        />
        {editedProduct ? null : ( 
        <Input
        id="rooms" 
        label="Rooms"
        errorText="Please enter a Valid price!"
        keyboardType="number-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        required
       />
        )}
        {editedProduct ? null : ( 
        <Input
        id="bathrooms"
        label="Bathrooms"
        errorText="Please enter a Valid price!"
        keyboardType="number-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        required        
         />
        )}  
        {editedProduct ? null : ( 
        <Input
        id="phonenumber"
        label="Phone Number"
        errorText="Please enter a Valid price!"
        keyboardType="number-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        required
        min={0.1}
        />      
        )}
    <Input
        id="title"
        label="Title"
        errorText="Please enter a Valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.title: ''}
        initiallyValid={!!editedProduct}
        required
        />
        <Input
        id="imageUrl"
        label="Image Url"
        errorText="Please enter a Valid image url!"
        keyboardType="default"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.imageUrl: ''}
        initiallyValid={!!editedProduct}
        required
        />
        {editedProduct ? null : ( 
        <Input
        id="price"
        label="Price"
        errorText="Please enter a Valid price!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        required
        min={0.1}
        />
        )}
        <Input
        id="description"
        label="Description"
        errorText="Please enter a Valid description!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        multiline
        numberOfLines={3}
        onInputChange={inputChangeHandler}  
        initialValue={editedProduct ? editedProduct.description: ''}
        initiallyValid={!!editedProduct}
        required
        minLength={5}
        />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        
    );  
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle:navData.navigation.getParam('productId')
        ? 'Edit Offers'
           : 'Add Offers',
        headerRight:( <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Save' 
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitFn} 
            />
            </HeaderButtons>
              ),   
    };
};


const styles = StyleSheet.create({
    form: {
        margin:20,
      },
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default EditProductScreen;