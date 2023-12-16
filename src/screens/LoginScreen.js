import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './Splash';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`https://ecommerce-project-api-ah5l.onrender.com/login`, user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        console.log('Logged in');
        navigation.replace('Main');
      })
      .catch(error => {
        Alert.alert('Login Error', 'Invalid error');
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <View style={{marginTop: 60}}>
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
          style={{height: 100, width: 150}}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}>
            Log in to your Account
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 90,
            gap: 5,
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
            // paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../images/email.png')}
            style={{marginLeft: 8, tintColor: 'gray', height: 24, width: 24}}
          />
          <TextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholder="Enter Your Email"
            style={{
              width: '70%',
              marginVertical: 8,
              color: 'gray',
              fontSize: email ? 16 : 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            gap: 5,
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
            // paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../images/padlock.png')}
            style={{marginLeft: 8, tintColor: 'gray', height: 24, width: 24}}
          />
          <TextInput
            value={password}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={true}
            placeholder="Enter Your Password"
            style={{
              width: '70%',
              marginVertical: 8,
              color: 'gray',
              fontSize: password ? 16 : 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text>Keep me logged in</Text>
          <Text style={{color: '#007FFF', fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 26,
            backgroundColor: '#FEBE10',
            width: 150,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
            borderRadius: 10,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
          style={{alignItems: 'center', marginTop: 10}}>
          <Text style={{color: 'gray', fontSize: 16}}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
