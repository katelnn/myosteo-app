import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../../firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAccountStyle, userInfoStyle } from '../../stylesheet/authenticationStyles';
import { confirmationStyle } from '../../stylesheet/authenticationStyles';
import { Ionicons } from '@expo/vector-icons';

import mainStyles from '../../stylesheet/mainStyle';
import { tutorialStyle } from '../../stylesheet/authenticationStyles';
import { homeStyle } from '../../stylesheet/authenticationStyles';

import Profile from '../../assets/icons/profile.svg';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const savedPhoto = await AsyncStorage.getItem('@profile_photo');
        if (savedPhoto) {
          setPhoto(JSON.parse(savedPhoto)); // Parse the photo object
        }
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    };
  
    fetchPhoto();
  }, []);

  //This function saves the user's name
  const saveNameToStorage = async (name) => {
    try {
      await AsyncStorage.setItem('@user_name', name);
    } catch (e) {
      console.error('Failed to save the name to AsyncStorage:', e);
    }
  };

  //his function handles user sign-up and then create a Firebase user,
  const handleSignUp = async () => {
    if (!email || !password) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(firebase_auth, email, password);
      const user = userCredential.user;

      console.log('User created:', user);

      await saveNameToStorage(name);

      // Show confirmation modal
      setModalVisible(true);
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  //This function closes the confirmation modal and navigates to the "UserInfo" screen.
  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate('UserInfo'); 
  };

  return (
    <View style={createAccountStyle.container2}>
      <TouchableOpacity style={createAccountStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="#001B62" />
      </TouchableOpacity>

      <Text style={userInfoStyle.title}>User Profile</Text>
      {photo ? (
  <Image
    source={{ uri: photo.uri }} // Use the 'uri' property of the parsed photo object
    style={{ width: 180, height: 180, borderRadius: 90 }}
  />
) : (
  <Profile width={180} height={180} />
)}
     
      <View style={[tutorialStyle.indicatorContainer, tutorialStyle.translationContainer]}>
          <View style={[tutorialStyle.indicator, tutorialStyle.activeIndicator]} />
          <View style={tutorialStyle.indicator} />
          <View style={tutorialStyle.indicator} />
          <View style={tutorialStyle.indicator} />
        </View>
        <View style={[homeStyle.buttonContainer, tutorialStyle.translationContainer]}>
        {photo ? (
          <TouchableOpacity 
            style={homeStyle.button} 
            onPress={() => navigation.navigate('Tutorial1')}
          >
            <Text style={homeStyle.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={homeStyle.button} 
            onPress={() => navigation.navigate('AddProfilePhoto')}
          >
            <Text style={homeStyle.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={homeStyle.button2} 
          onPress={() => navigation.navigate('Home', { screen: 'Dashboard' })}
        >
          <Text style={homeStyle.buttonText3}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
