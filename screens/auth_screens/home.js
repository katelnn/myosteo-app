import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { homeStyle } from '../../stylesheet/authenticationStyles';
import MyOsteoLogo from '../../assets/icons/myOsteoLogo.svg';
import FrontPageLogo from '../../assets/icons/frontPgLogo.svg';

export default function HomeScreen({ navigation }) {
  return (
    <View style={homeStyle.container}>
  
      <View style={homeStyle.myOsteoContainer}>
        <Text style={homeStyle.title}>myOsteo.</Text>
        <Text style={homeStyle.paragraph}>
        Your companion for stronger {'\n'} bones and better health.
        </Text>
        <MyOsteoLogo 
          // width={50} 
          // height={50} 
          // style={{ transform: [{ translateX: -10 }, { translateY: 50 }] }} 
        />
      </View>

      <View style={homeStyle.buttonContainer}>
        <TouchableOpacity 
          style={homeStyle.button} 
          onPress={() => navigation.navigate('LogIn')}
        >
          <Text style={homeStyle.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={homeStyle.button2} 
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={homeStyle.buttonText2}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
