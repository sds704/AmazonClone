import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useContext, useState, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserType} from '../../UserContext';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);

  console.log('userId', userId);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-project-api-ah5l.onrender.com/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );
  console.log("addresses", addresses);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 45}}>
      <View
        style={{
          backgroundColor: '#00CED1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
          <Image
            source={require('../images/search.png')}
            style={{marginLeft: 8, tintColor: 'black', height: 22, width: 22}}
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Image
          source={require('../images/microphone.png')}
          style={{tintColor: 'black', height: 24, width: 24}}
        />
      </View>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate('AddressScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}>
          <Text>Add a new Address</Text>
          {/* <MaterialIcons name="keyboard-arrow-right" size={24} color="black" /> */}
          <Image
            source={require('../images/next.png')}
            style={{tintColor: 'black', height: 24, width: 24}}
          />
        </Pressable>

        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: '#D0D0D0',
                padding: 10,
                flexDirection: 'column',
                gap: 5,
                marginVertical: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item?.name}
                </Text>
                {/* <Entypo name="location-pin" size={24} color="red" /> */}
                <Image
                  source={require('../images/location_circle.png')}
                  style={{tintColor: 'red', height: 24, width: 24}}
                />
              </View>

              <Text style={{fontSize: 15, color: '#181818'}}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{fontSize: 15, color: '#181818'}}>
                {item?.street}
              </Text>

              <Text style={{fontSize: 15, color: '#181818'}}>
                India, Mumbai
              </Text>

              <Text style={{fontSize: 15, color: '#181818'}}>
                phone No : {item?.mobileNo}
              </Text>
              <Text style={{fontSize: 15, color: '#181818'}}>
                pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 7,
                }}>
                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}>
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}>
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}>
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
