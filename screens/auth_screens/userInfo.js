import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Ionicons } from '@expo/vector-icons';
import { userInfoStyle, createAccountStyle } from '../../stylesheet/authenticationStyles';

import MaleDefault from '../../assets/icons/maleDefault.svg';
import MaleSelected from '../../assets/icons/maleSelected.svg';
import FemaleDefault from '../../assets/icons/femaleDefault.svg';
import FemaleSelected from '../../assets/icons/femaleSelected.svg';

export default function UserInfoScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState(''); // Separate state for feet
  const [inches, setInches] = useState(''); // Separate state for inches
  const [height, setHeight] = useState(''); // Single state for cm when selected
  const [gender, setGender] = useState('');  // New state for gender
  const [weightUnit, setWeightUnit] = useState('kg');  // State for weight unit (kg/lbs)
  const [heightUnit, setHeightUnit] = useState('cm');  // State for height unit (cm/ft)
  const [error, setError] = useState(""); // Track error message
  const [ageError, setAgeError] = useState(""); // Track error message for age
  const [weightError, setWeightError] = useState(""); // Track error message for weight
  const [heightError, setHeightError] = useState(""); // Track error message for height

  // This function save user data 
  const saveUserInfoToStorage = async (age, weight, height, gender, heightUnit, weightUnit) => {
    try {
      await AsyncStorage.setItem('@user_gender', gender);
      await AsyncStorage.setItem('@user_age', age);
      await AsyncStorage.setItem('@user_weight', weight);
      await AsyncStorage.setItem('@user_height', height);  // Save formatted height
      await AsyncStorage.setItem('@user_gender', gender);
      await AsyncStorage.setItem('@user_height_unit', heightUnit);  // Save the unit for height
      await AsyncStorage.setItem('@user_weight_unit', weightUnit);  // Save the unit for weight
    } catch (e) {
      console.error('Failed to save user info to AsyncStorage:', e);
    }
  };

 //This function saves the user's age, weight, height, gender, and unit preferences
 const handleNext = () => {
  let formattedHeight = height;

  if (heightUnit === 'ft') {
    formattedHeight = `${feet}'${inches}"`;
  }

  // Validation checks
  if (!gender) {
    setError('*Please select a gender');
    return;
  }
  if (!age || isNaN(age) || age < 20 || age > 120) {
    setAgeError('Age must be between 20 and 120');
    return;
  }
  if (!weight || isNaN(weight) || weight < 30 || weight > 125) {
    setWeightError('*Weight must be between 30 and 125');
    return;
  }
  if (heightUnit === 'cm' && (!height || isNaN(height) || height < 100 || height > 250) ) {
    setHeightError('*Height must be between 100 and 250 cm');
    return;
  }
  

  // Clear error and proceed
  setError('');
  saveUserInfoToStorage(age, weight, formattedHeight, gender, heightUnit, weightUnit);
  navigation.navigate('CreateAccount1');
};


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={userInfoStyle.container}>
      <TouchableOpacity style={createAccountStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="#001B62" />
      </TouchableOpacity>
        <Text style={userInfoStyle.title}>User Information</Text>
        
        {/* Gender selection */}
        <View style={userInfoStyle.genderContainer}>
          <TouchableOpacity
            style={[userInfoStyle.genderButton, gender === 'Male' && userInfoStyle.selectedButton]}
            onPress={() => {setGender('Male'); setError("");}}
          >
           {gender === 'Male' ? (<MaleSelected width={45} height={45} />) : (<MaleDefault width={45} height={45} />)}
            <Text
            style={[
              gender === 'Male'
                ? userInfoStyle.buttonTextSelected
                : userInfoStyle.buttonTextDefault,
            ]}
          >
            Male
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[userInfoStyle.genderButton, gender === 'Female' && userInfoStyle.selectedButton]}
            onPress={() => {setGender('Female'); setError("");}}
          >
           {gender === 'Female' ? (<FemaleSelected width={45} height={45} />) : (<FemaleDefault width={45} height={45} />)}
           <Text
            style={[
              gender === 'Female'
                ? userInfoStyle.buttonTextSelected
                : userInfoStyle.buttonTextDefault,
            ]}
          >
            Female
          </Text>
          </TouchableOpacity>
        </View>

        {/* Error Message Below Gender Selection */}
        {error === '*Please select a gender' ? (
          <Text style={userInfoStyle.errorText1}>{error}</Text>
        ) : null}

        {/* Age input */}
        <Text style={userInfoStyle.label}>Age</Text>
        <View style={userInfoStyle.inputContainer}>
          <TextInput
            style={userInfoStyle.input}
            placeholder="Enter age"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              if (text) {
                setAgeError(''); 
              }
            }}
            keyboardType="numeric"
          />
           <View style={userInfoStyle.unitButtons}>
                <Text
                style={[
                  weightUnit === 'cm'
                    ? userInfoStyle.buttonTextSelected
                    : userInfoStyle.buttonTextDefault,
                ]}
              >
                years
              </Text>
          </View>
        </View>
       {/* Error Message Below Age */}
       {ageError ? (
          <Text style={userInfoStyle.errorText2}>{ageError}</Text>
        ) : null}
        
        {/* Weight input with unit buttons */}
        <Text style={userInfoStyle.label}>Weight</Text>
        <View style={userInfoStyle.inputContainer}>
          <TextInput
            style={[userInfoStyle.input, userInfoStyle.weightInput]}
            placeholder={`Enter approximate weight (${weightUnit})`}
            value={weight}
            onChangeText={(text) => {
              setWeight(text);
              if (text) {
                setWeightError(''); 
              }
            }}
            keyboardType="numeric"
          />
          <View style={userInfoStyle.unitButtons}>
                <Text
                style={[
                  weightUnit === 'cm'
                    ? userInfoStyle.buttonTextSelected
                    : userInfoStyle.buttonTextDefault,
                ]}
              >
                kg
              </Text>
          </View>
        </View>
        {/* Error Message Below Weight */}
       {weightError ? (
          <Text style={userInfoStyle.errorText2}>{weightError}</Text>
        ) : null}
        
        {/* Height input with dynamic units */}
        <Text style={userInfoStyle.label}>Height</Text>
        {heightUnit === 'cm' ? (
          <View style={userInfoStyle.inputContainer}>
            <TextInput
              style={[userInfoStyle.input, userInfoStyle.heightInput]}
              placeholder="Enter approximate height (cm)"
              value={height}
              onChangeText={(text) => {
                setHeight(text);
                if (text) {
                  setHeightError(''); 
                }
              }}
              keyboardType="numeric"
            />
            <View style={userInfoStyle.unitButtons}>
                <Text
                style={[
                  weightUnit === 'cm'
                    ? userInfoStyle.buttonTextSelected
                    : userInfoStyle.buttonTextDefault,
                ]}
              >
                cm
              </Text>
            </View>
          </View>

        ) : (
          <View style={userInfoStyle.inputContainer}>
            <TextInput
              style={[userInfoStyle.input, userInfoStyle.heightInput]}
              placeholder="Feet"
              value={feet}
              onChangeText={setFeet}
              keyboardType="numeric"
            />
            <TextInput
              style={[userInfoStyle.input, userInfoStyle.heightInput]}
              placeholder="Inches"
              value={inches}
              onChangeText={setInches}
              keyboardType="numeric"
            />
            <View style={userInfoStyle.unitButtons}>
              <TouchableOpacity
                style={[userInfoStyle.unitButton, heightUnit === 'cm' && userInfoStyle.selectedButton]}
                onPress={() => {
                  setHeightUnit('cm');
                  setFeet('');
                  setInches('');
                }}
              >
                <Text style={userInfoStyle.buttonText}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[userInfoStyle.unitButton, heightUnit === 'ft' && userInfoStyle.selectedButton]}
                onPress={() => {
                  setHeightUnit('ft');
                  setHeight(''); // Clear cm input if switching to ft
                }}
              >
                <Text style={userInfoStyle.buttonText}>ft</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

         {/* Error Message Below Height */}
       {heightError ? (
          <Text style={userInfoStyle.errorText2}>{heightError}</Text>
        ) : null}

        <TouchableOpacity
          style={userInfoStyle.button} 
          onPress={handleNext}
        >
          <Text style={userInfoStyle.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
