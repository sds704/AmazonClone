import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('Main');
  //   }, 1300);
  // }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/success.gif')}
        style={{
          width: '40%',
          height: '40%',
        }}
        resizeMode={'cover'}
      />
      <Text
        style={{
          marginTop: 0,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}>
        Your Order Has been Recieved
      </Text>

      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          padding: 12,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          width: '60%',
          backgroundColor: '#ecebed',
        }}
        onPress={() => navigation.navigate('Main')}>
        <Text style={{fontSize: 18, fontWeight: '600', textAlign: 'center'}}>
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
