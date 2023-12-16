import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import LoginScreen from './LoginScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 3000);
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      navigation.replace('Main');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../images/amg.png')}
        style={{height: '10%', width: '100%'}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
