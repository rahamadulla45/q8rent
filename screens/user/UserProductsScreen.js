import React from 'react';
import { View,Text,FlatList,Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';


const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text:'Yes', style:'destructive', 
            onPress:() => {
                dispatch(productsActions.deleteProduct(id));
                }
            }
        ])
    };

if (userProducts.length === 0) {
    return (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <Text>No offers found, maybe start creating some?</Text>
    </View>
    );
}
    return (
    <FlatList 
    data={userProducts} 
    keyExtractor={item => item.id} 
    renderItem={itemData =>( 
        <ProductItem
        image={itemData.item.imageUrl} 
        description={itemData.item.description} 
        onSelect={() => {
            editProductHandler(itemData.item.id);
       }}
        >
        <View style={{flexDirection:'row'}}>
            <View style={{flexGrow:1}}>
            <Button 
    color={Colors.primary}
    title="Edit"
    onPress={() => {
        editProductHandler(itemData.item.id);
}}
    />
            </View>
     <View style={{flexGrow:1}}>
     <Button
    color={Colors.accent}
    title="Delete"
    onPress={deleteHandler.bind(this, itemData.item.id)}
    />
         
         </View> 
   
        </View>
      
        </ProductItem>
    )}
    />
    );
};
UserProductsScreen.navigationOptions = navData => {
 return {headerTitle:'Your Offers',
 headerLeft:( <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item 
    title='Menu' 
    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
    onPress={() => {
        navData.navigation.toggleDrawer();
    }} 
    />
    </HeaderButtons>
    ),
    headerRight: ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
        title='Add' 
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => {
            navData.navigation.navigate('EditProduct');
        }} 
        />
        </HeaderButtons>
        ),   
};
};

export default UserProductsScreen;
