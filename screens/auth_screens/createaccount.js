import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../../firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAccountStyle } from '../../stylesheet/authenticationStyles';
import { confirmationStyle } from '../../stylesheet/authenticationStyles';
import { Ionicons } from '@expo/vector-icons';

import mainStyles from '../../stylesheet/mainStyle';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      alert('Please fill out all fields.');
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
      alert(error.message);
    }
  };

  //This function closes the confirmation modal and navigates to the "UserInfo" screen.
  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate('UserInfo'); 
  };

  return (
    <View style={createAccountStyle.container}>
      <TouchableOpacity style={createAccountStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="#001B62" />
      </TouchableOpacity>

      <Text style={createAccountStyle.title}>Welcome!</Text>

      <View style={createAccountStyle.inputContainer}>
        <Text style={createAccountStyle.label}>First Name</Text>
        <TextInput
          style={createAccountStyle.input}
          placeholder="Enter your name here"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={createAccountStyle.inputContainer}>
        <Text style={createAccountStyle.label}>Email</Text>
        <TextInput
          style={createAccountStyle.input}
          placeholder="Enter your email here"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={createAccountStyle.inputContainer}>
        <Text style={createAccountStyle.label}>Password</Text>
        <View style={createAccountStyle.passwordContainer}>
          <TextInput
            style={createAccountStyle.passwordInput}
            placeholder="Enter your password here"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={!showPassword ? "eye-off" : "eye"} size={24} color="#001B62" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={createAccountStyle.button} onPress={handleSignUp}>
        <Text style={createAccountStyle.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Terms and Privacy Section */}
      <View style={createAccountStyle.termsContainer}>
        <Text style={createAccountStyle.agreementText}>
          By creating your account, you agree to the{' '}
          <Text
            style={createAccountStyle.linkText}
            onPress={() => setTermsModalVisible(true)}
          >
            Terms of Services
          </Text>{' '}
          and{' '}
          <Text
            style={createAccountStyle.linkText}
            onPress={() => setPrivacyModalVisible(true)}
          >
            Privacy Policy
          </Text>.
        </Text>
      </View>

      {/* Terms of Services Modal */}
      <Modal
        visible={termsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={createAccountStyle.modalContainer}>
          <ScrollView style={createAccountStyle.modalContent}>
            <Text style={createAccountStyle.modalTitle}>Terms of Services</Text>
            <Text style={mainStyles.paragraph}>By using this app, you agree to the following terms:</Text>
            <Text></Text><Text></Text>
            <Text style={mainStyles.paragraph}>
              1. <Text style={mainStyles.boldText}>Purpose:</Text> This app provides general information and tools related to osteoporosis management and is not a substitute for professional medical advice, diagnosis, or treatment.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              2. <Text style={mainStyles.boldText}>Medical Disclaimer:</Text> Always consult your doctor or healthcare provider before making decisions about your health.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              3. <Text style={mainStyles.boldText}>User Responsibility:</Text> You are responsible for how you use the information provided by this app. The app is not liable for any actions you take based on its content.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              4. <Text style={mainStyles.boldText}>Data Privacy:</Text> Your data will be handled according to our Privacy Policy. We do not share your personal information without your consent.
            </Text>
            <Text></Text>
            <TouchableOpacity
              style={createAccountStyle.closeButton}
              onPress={() => setTermsModalVisible(false)}
            >
              <Text style={createAccountStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        visible={privacyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={createAccountStyle.modalContainer}>
          <ScrollView style={createAccountStyle.modalContent}>
            <Text style={createAccountStyle.modalTitle}>Privacy Policy</Text>
            
            <Text style={mainStyles.paragraph}>By using this app, you agree to the following terms:</Text>
            <Text></Text><Text></Text>
            <Text style={mainStyles.paragraph}>
              1. <Text style={mainStyles.boldText}>Data Collection:</Text> We may collect personal information (e.g., age, weight, and health preferences) to provide personalized recommendations.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              2. <Text style={mainStyles.boldText}>Data Usage:</Text> Your information is used to improve your experience in the app. We do not sell your data to third parties.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              3. <Text style={mainStyles.boldText}>Data Security:</Text> We use industry-standard measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              4. <Text style={mainStyles.boldText}>Third-Party Services:</Text> The app may use third-party tools (e.g., analytics) which adhere to their own privacy policies.
            </Text>
            <Text></Text>
            <Text style={mainStyles.paragraph}>
              5. <Text style={mainStyles.boldText}>Your Control:</Text> You can request to access, modify, or delete your data at any time.
            </Text>
            <Text></Text>
            <TouchableOpacity
              style={createAccountStyle.closeButton}
              onPress={() => setPrivacyModalVisible(false)}
            >
              <Text style={createAccountStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Transparent Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={confirmationStyle.modalOverlay}>
          <View style={confirmationStyle.modalContent}>
            <Text style={confirmationStyle.modalTitle}>Account created!</Text>
            <Text style={confirmationStyle.modalMessage}>
              Welcome aboard! Let's continue setting up your profile.
            </Text>
            <TouchableOpacity style={confirmationStyle.continueButton} onPress={handleContinue}>
              <Text style={confirmationStyle.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
    </View>
  );
}
