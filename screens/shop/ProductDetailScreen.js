import React from 'react';
import Colors from '../../constants/Colors';
import { 
    ScrollView,
     View, 
     Text, 
     Image, 
     Button, 
     StyleSheet 
    } from 'react-native';
    import { useSelector, useDispatch } from 'react-redux';
    import * as cartActions from '../../store/actions/cart';

    const ProductDetailScreen = props => {
        const productId = props.navigation.getParam('productId');
        const selectedProduct = useSelector(state =>
             state.products.availableProducts.find(prod => prod.id === productId)
        );
        const dispatch = useDispatch();

        return (
       <ScrollView>
           <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
           <View style={styles.actions}>
           {/* <Button color={Colors.primary} title="Add to Cart" onPress={() => {
               dispatch(cartActions.addToCart(selectedProduct));
               }}/> */}
           </View>
           <Text style={styles.title1}>{selectedProduct.title}</Text>
           <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.country}</Text>
               </View>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.rentType}</Text>
               </View>
         
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.region}</Text>
               </View>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.city}</Text>
               </View>
         
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.rooms} rooms</Text>
               </View>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.bathrooms} bathrooms</Text>
               </View>
         
           </View>
           <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.price} KD</Text>
               </View>
               <View style={{flex:1}}>
               <Text style={styles.title}>{selectedProduct.phonenumber}</Text>
               </View>
         
           </View>
          
      <Text style={styles.title}>{selectedProduct.description}</Text>

       </ScrollView>
        )
    };

    ProductDetailScreen.navigationOptions = navData => {
        return {
            headerTitle: navData.navigation.getParam('productTitle')
        };
    }

    const styles= StyleSheet.create({
        image:{
            width:'100%',
            height:250,
         
        },
        actions:{
            marginVertical:10,
            alignItems:'center'
        },
        title:{
           
          
 
            // Set border width.
            borderWidth: 1.5,
         
            // Set border Hex Color Code Here.
            borderColor: Colors.primary,
         
            // Setting up Text Font Color.
            color: Colors.primary,
         
            // Setting Up Background Color of Text component.
            
            // Adding padding on Text component.
            padding : 6,
         
            fontSize: 15,
         
            textAlign: 'right',
         
            margin: 10,
        },
        title1:{
           
          
 
            // Set border width.
            borderWidth: 1.5,
         
            // Set border Hex Color Code Here.
            borderColor: Colors.primary,
         
            // Setting up Text Font Color.
            color: Colors.primary,
         
            // Setting Up Background Color of Text component.
            
            // Adding padding on Text component.
            padding : 8,
         
            fontSize: 18,
         
            textAlign: 'center',
         
            margin: 10,
        },
        price:{
            fontSize:20,
            color:Colors.primary,
            textAlign:'center',
            marginVertical:20,
            fontFamily:'open-sans-bold'
        },
        description:{
            fontFamily:'open-sans',
            fontSize: 14,
            textAlign:'center',
            marginHorizontal:20
        }
    });

    export default ProductDetailScreen;
