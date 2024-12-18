import { Text, Image, ScrollView, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import mainStyles from '../../stylesheet/mainStyle.js';
import healthPlanStyles from '../../stylesheet/healthPlanStyle.js';

import React, { useEffect, useState } from "react";
import { username } from "../../config.js";

import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { useNavigation, useRoute } from '@react-navigation/native'; 


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const navigation = useNavigation(); 
  const route = useRoute();

  const exerciseTime = 15;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //This function fetch weather data from GeoNames API
  const fetchWeather = async () => {
    console.log(username);
    try {
      const response = await fetch(
        `http://api.geonames.org/findNearByWeatherJSON?lat=49.19&lng=-123.17&username=${"Frentzen100"}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data.weatherObservation);
      } else {
        setError("Failed to fetch weather");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={mainStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={[mainStyles.container]}>
       <Image
            source={require('../../assets/images/outdoor.png')} 
            style={mainStyles.topImage}
      />
      <View style={mainStyles.buttonContainer}>
        <TouchableOpacity style={mainStyles.backButton} onPress={() => navigation.navigate('Home', { screen: 'HealthPlan' })}>
          <View style={mainStyles.buttonContent}>
            <AntDesign name="arrowleft" size={24} color="#7887B0" />
            <Text style={mainStyles.backButtonText}>Back </Text>
          </View>
        </TouchableOpacity>
      </View>
    
      <View style={healthPlanStyles.outdoorContainer}>
        <View style={healthPlanStyles.outdoorTopContainer}>
            <Text style={[mainStyles.heading3, healthPlanStyles.date]}>Some tips before walking</Text>
        </View>
        
         <View style={healthPlanStyles.outdoorInstructionContainer}>
            <Text style={healthPlanStyles.instructionTitle3}>Engage your core</Text>
            <Text style={healthPlanStyles.instructionText2}>
                    Find a sturdy chair or couch to aim for during the squat.
            </Text>
        </View>

        <View style={healthPlanStyles.outdoorInstructionContainer}>
            <Text style={healthPlanStyles.instructionTitle3}>Use proper footwear</Text>
            <Text style={healthPlanStyles.instructionText2}>
              Wear supportive shoes with good cushioning to absorb impact and reduce injury.
            </Text>
        </View>

        <View style={healthPlanStyles.outdoorInstructionContainer}>
            <Text style={healthPlanStyles.instructionTitle3}>Swing your arms naturally</Text>
            <Text style={healthPlanStyles.instructionText2}>
              Let your arms move freely to aid balance and coordination.
            </Text>
        </View>

        <View style={healthPlanStyles.outdoorInstructionContainer}>
            <Text style={healthPlanStyles.instructionTitle3}>Stay hydrated, take breaks</Text>
            <Text style={healthPlanStyles.instructionText2}>
              Drink water before and after walking, take breaks to avoid overexertion and reduces strain.
            </Text>
        </View>

        

        <View style={mainStyles.bottomButtonContainer2}>
            <TouchableOpacity style={mainStyles.bottomButton} onPress={() => navigation.navigate("Outdoor2")} >
            <View style={mainStyles.buttonContent}>
                <Text style={[mainStyles.whiteCaption, healthPlanStyles.exerciseStatusText]}>Next </Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}