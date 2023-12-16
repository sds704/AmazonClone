import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import {useRoute} from '@react-navigation/native';

const ProductItem = ({item}) => {
  const route = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <ScrollView>
      <View
        style={{marginVertical: '10%', flex: 1, flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
        <View>
          <Image
            source={{uri: item?.image}}
            style={{width: 140, height: 140, resizeMode: 'contain'}}
          />
          <Text numberOfLines={1} style={{width: 140, marginTop: 10}}>
            {item?.title}
          </Text>

          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              ₹{item?.price}
            </Text>
            <Text style={{color: '#FFC72C', fontWeight: 'bold'}}>
              {item?.rating?.rate} ratings
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => addItemToCart(item)}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            {addedToCart ? (
              <View>
                <Text>Added to Cart</Text>
              </View>
            ) : (
              <Text>Add to Cart</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
