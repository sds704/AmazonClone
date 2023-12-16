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
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    console.log(user);
    // send a POST  request to the backend API to register the user
    axios
      .post(`https://ecommerce-project-api-ah5l.onrender.com/register`, user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered Successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering',
        );
        console.log('registration failed', error);
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
            Register to your Account
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 80,
            gap: 5,
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
            // paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../images/profile.png')}
            style={{marginLeft: 8, tintColor: 'gray', height: 24, width: 24}}
          />
          <TextInput
            value={name}
            onChangeText={txt => setName(txt)}
            placeholder="Enter Your Name"
            style={{
              width: "70%",
              marginVertical: 8,
              color: 'gray',
              fontSize: name ? 16 : 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            gap: 5,
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
            // paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../images/email.png')}
            style={{marginLeft: 8, tintColor: 'gray', height:24, width:24}}
          />
          <TextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholder="Enter Your Email"
            style={{
              width: "70%",
              marginVertical: 8,
              color: 'gray',
              fontSize: email ? 16 : 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            gap: 5,
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
            // paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Image
            source={require('../images/padlock.png')}
            style={{marginLeft: 8, tintColor: 'gray',height:24, width:24}}
          />
          <TextInput
            value={password}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={true}
            placeholder="Enter Your Password"
            style={{
              width: "70%",
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
          onPress={handleRegister}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{alignItems: 'center', marginTop: 10}}>
          <Text style={{color: 'gray', fontSize: 16}}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
