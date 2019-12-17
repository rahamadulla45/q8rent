import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Button, Text, Platform, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'; 
import * as productsActions from '../../store/actions/products';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';


const RentScreen = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try{
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
        setError(err.message);
        }
        setIsRefreshing(false);
       }, [dispatch, setIsLoading, setError]);
    
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts); 
        return () => {
        willFocusSub.remove();
        };
    }, [loadProducts]);
    
    useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
        setIsLoading(false);
    });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Detail',{ 
            productId: id,
            productTitle: title 
            });
    };

    if (error) {
        return <View style={styles.centered}>   
       <Text>An error occured!</Text>       
       <Button 
       title="Try again" 
       onPress={loadProducts}
       color={Colors.primary} />
    </View>
    }
    if (isLoading) {
        return <View style={styles.centered}>   
            <ActivityIndicator size='large' color = {Colors.primary} />
        </View>
    }

    if (!isLoading && products.length === 0){
        return <View style={styles.centered}>   
        <Text>No products found. Maybe start adding some!</Text>
    </View>  
    }
    return (
        <View  style={styles.screen}>
        <View style={styles.gradient}>
<Image style={styles.avatar} source={require('../../assets/rent.png')} />
<Text style={styles.name}>Rent Offers</Text>
   </View>
       
   <FlatList 
    onRefresh={loadProducts}
    refreshing={isRefreshing}
    data={products} 
    keyExtractor={item => item.id}
    renderItem={itemData => (
    <ProductItem 
    image={itemData.item.imageUrl} 
    description={itemData.item.description} 
    onSelect={() => {
       selectItemHandler(itemData.item.id, itemData.item.title);
    }}  
    >
    
    {/* <Button
    color={Colors.primary}
    title="View Details"
    onPress={() => {
        selectItemHandler(itemData.item.id, itemData.item.title);
}}
    /> */}
    {/* <Button
    color={Colors.primary}
    title="To Cart"
    onPress={() => {
        dispatch(cartActions.addToCart(itemData.item));
        }}
    /> */}
    </ProductItem>
    )}
    />
    </View>
); 
}

RentScreen.navigationOptions = navData => {
    return {
    headerTitle:'Rent Offers',
    // headerLeft:( <HeaderButtons HeaderButtonComponent={HeaderButton}>
    // <Item 
    // title='Menu' 
    // iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
    // onPress={() => {
    //     navData.navigation.toggleDrawer();
    // }} 
    // />
    // </HeaderButtons>
    // ),
    // headerRight:( 
    // <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
    //     onPress={() => {
    //         navData.navigation.navigate('Cart')
    //     }} 
    //     />
    // </HeaderButtons>
    // )}
}
}
const styles = StyleSheet.create({
    centered:{ flex:1, justifyContent:'center', alignItems:'center'},
    screen: {
        flex:1,
    },
    avatar: {
        height: 120,
        width: '55%',
         },
      gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:70
    },
    name:{
        alignItems:'center',
        fontSize: 20,
        color:"#354c6d",
        letterSpacing: 1,
        bottom:20
    },
})
export default RentScreen;