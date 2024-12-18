import { Text, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import mainStyles from '../../stylesheet/mainStyle';
import healthPlanStyles from '../../stylesheet/healthPlanStyle';

import React, { useEffect, useState } from "react";

import AntDesign from '@expo/vector-icons/AntDesign';

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

  const exerciseTime = route.params?.exerciseTime || 0;


  return (
    <ScrollView style={[mainStyles.container]}>
       <Image
            source={require('../../assets/images/indoor.png')} 
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
            <Text style={[mainStyles.heading3, healthPlanStyles.date]}>Muscle Strengthening</Text>
        </View>
        <View style={healthPlanStyles.indoorExerciseTag}>
            <Text style={[mainStyles.caption, healthPlanStyles.exerciseType]}> Indoors</Text>
            <View style={healthPlanStyles.durationContainer}>
                <AntDesign name="clockcircle" size={14} color="#001B62" />
                <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
                15 mins
                </Text>
            </View>
        </View>
        <Text style={mainStyles.paragraph}>
        Muscle-strengthening exercises help slow bone weakening. These home exercises target key muscles to enhance stability and mobility.
        </Text>

        <Text style={[mainStyles.heading3, healthPlanStyles.exercisePreviewText]}>Exercise Preview</Text>
        <View style={healthPlanStyles.indoorExercisePreviewContainer}>
            <Image
                source={require('../../assets/images/chair squat.png')} 
                style={healthPlanStyles.indoorExercisePreviewImage}
            />
            <View style={healthPlanStyles.indoorExercisePreviewInfo}>
                <Text style={healthPlanStyles.exerciseTitle}>1. Chair Squats</Text>
                <View style={healthPlanStyles.durationContainer}>
                    <AntDesign name="clockcircle" size={14} color="#001B62" />
                    <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
                    5 mins
                    </Text>
                </View>
            </View>
        </View>

        <View style={healthPlanStyles.indoorExercisePreviewContainer}>
            <Image
                source={require('../../assets/images/hamstring curl.png')} 
                style={healthPlanStyles.indoorExercisePreviewImage}
            />
            <View style={healthPlanStyles.indoorExercisePreviewInfo}>
                <Text style={healthPlanStyles.exerciseTitle}>2. Hamstring Curls</Text>
                <View style={healthPlanStyles.durationContainer}>
                    <AntDesign name="clockcircle" size={14} color="#001B62" />
                    <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
                    5 mins
                    </Text>
                </View>
            </View>
        </View>

        <View style={healthPlanStyles.indoorExercisePreviewContainer}>
            <Image
                source={require('../../assets/images/heel raise.png')} 
                style={healthPlanStyles.indoorExercisePreviewImage}
            />
            <View style={healthPlanStyles.indoorExercisePreviewInfo}>
                <Text style={healthPlanStyles.exerciseTitle}>3. Heel Raise</Text>
                <View style={healthPlanStyles.durationContainer}>
                    <AntDesign name="clockcircle" size={14} color="#001B62" />
                    <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
                    5 mins
                    </Text>
                </View>
            </View>
        </View>

        <View style={mainStyles.bottomButtonContainer}>
            <TouchableOpacity style={mainStyles.bottomButton} onPress={() => navigation.navigate("Indoor2", { exerciseTime: route.params?.exerciseTime })} >
            <View style={mainStyles.buttonContent}>
                <Text style={[mainStyles.whiteCaption, healthPlanStyles.exerciseStatusText]}>Start Exercise</Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}