import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../../firebaseConfig';
import { createAccountStyle } from '../../stylesheet/authenticationStyles';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //This function manages the user sign-in process
  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
      const user = userCredential.user;

      console.log('User signed in:', user);

      // Navigate to the main app screen after successful login
      navigation.navigate('Home', { screen: 'Dashboard' });
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert(error.message);
    }
  };

  return (
    <View style={createAccountStyle.container}>
      <TouchableOpacity style={createAccountStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#001B62" />
      </TouchableOpacity>

      <Text style={createAccountStyle.title}>Welcome Back!</Text>

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

      <TouchableOpacity style={createAccountStyle.button} onPress={handleSignIn}>
        <Text style={createAccountStyle.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={createAccountStyle.footer}>
        <Text style={createAccountStyle.footerText}>
          Don't have an account?{' '}
          <Text
            style={createAccountStyle.linkText}
            onPress={() => navigation.navigate('SignUpScreen')} // Adjust route as needed
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
