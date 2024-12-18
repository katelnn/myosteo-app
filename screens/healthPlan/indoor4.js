import { Text, Image, ScrollView, View, TouchableOpacity, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import mainStyles from '../../stylesheet/mainStyle.js';
import healthPlanStyles from '../../stylesheet/healthPlanStyle.js';

import React, { useEffect, useState, useRef } from "react";
import { username } from "../../config.js";

import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { useNavigation, useRoute } from '@react-navigation/native'; 

import SpeakerMute from '../../assets/icons/speakerMute.svg';
import SpeakerUnmute from '../../assets/icons/speakerUnmute.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Speech from 'expo-speech'; // Import Expo's Speech module
import { Audio } from 'expo-av';

import LottieView from "lottie-react-native";


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const navigation = useNavigation(); 
  const route = useRoute();

  const [isModalVisible, setModalVisible] = useState(false);

  const animation = useRef(null);
  const exerciseTime = 15;


  const [isMuted, setIsMuted] = useState(true); // State to track mute/unmute
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if instructions are being read
  const [sound, setSound] = useState(null);

  const handleReadArticle2 = () => {
    const articleText = 
    `
      Heel Raise. First, position your feet. Stand with your feet shoulder-width apart.  

      Next, perform the raise. Rise onto your toes as high as you can, keeping your body upright without leaning forward.

      Next, lower slowly. Return to the starting position, lowering your heels gently.

      Lastly, start slow. Begin with 10 repetitions and gradually increase to 40.
    `;
    ;
    
    // Use Expo Speech API to speak the text
    Speech.speak(articleText, { language: 'en', rate: 1.0 });
    setIsMuted(false);
    setIsSpeaking(true);
  };

  const handleStopReading2 = () => {
    Speech.stop(); // Stop speaking
    setIsSpeaking(false);
    setIsMuted(true);
  };

  const handleNextPress = () => {
    setModalVisible(true);
  };

  const saveExerciseData = async () => {
    try {
      const activity = {
        type: "Muscle Strengthening",
        time: "5 mins",
        date: new Date().toISOString(),
      };

      const existingLog = await AsyncStorage.getItem('dailyLog');
      const parsedLog = existingLog ? JSON.parse(existingLog) : [];
      const updatedLog = [...parsedLog, activity];

      await AsyncStorage.setItem('dailyLog', JSON.stringify(updatedLog));
    } catch (error) {
      console.error("Error saving exercise data:", error);
    }
  };

  const handleCompleteExercise = async () => {
    await saveExerciseData(); 
    setModalVisible(false); 
    navigation.navigate("Home", {
      screen: "Dashboard",
      params: { exerciseIncrement: 15 }, 
    });
  };

  return (
    <ScrollView style={[mainStyles.container]}>
        <TouchableOpacity style={mainStyles.backButton2} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#001B62" />
        </TouchableOpacity>

        <View style={[healthPlanStyles.indoorExerciseContainer]}>
            <View style={healthPlanStyles.indoorExerciseTypeContainer}>
                <Text style={[mainStyles.heading3]}>Heel Raise</Text>   
                <TouchableOpacity
                    style={[healthPlanStyles.soundButton, isMuted && healthPlanStyles.selectedSoundButton]} // Style changes if muted
                    onPress={isSpeaking ? handleStopReading2 : handleReadArticle2}
                >
                    {isMuted ? (
                    <SpeakerMute width={25} height={25} />
                    ) : (
                    <SpeakerUnmute width={25} height={25} />
                    )}
                </TouchableOpacity>                 
            </View>

            <View style={healthPlanStyles.durationContainer}>
                <AntDesign name="clockcircle" size={14} color="#001B62" />
                <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
                5 mins
                </Text>
            </View>

            <View style={healthPlanStyles.indoorGifContainer}>
                <Text style={[mainStyles.heading4, healthPlanStyles.instructionHeading]}>
                    Demonstration
                </Text>
                <Image
                    source={require('../../assets/gif/exercise3.gif')}
                    style={healthPlanStyles.exerciseGif}
                />
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Position your feet</Text>
                <Text style={healthPlanStyles.instructionText}>
                Stand with your feet shoulder-width apart.
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Perform the raise</Text>
                <Text style={healthPlanStyles.instructionText}>
                Rise onto your toes as high as you can, keeping your body upright without leaning forward.
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Lower slowly</Text>
                <Text style={healthPlanStyles.instructionText}>
                Return to the starting position, lowering your heels gently.
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Start slow</Text>
                <Text style={healthPlanStyles.instructionText}>
                    Begin with 10 repetitions and gradually increase to 40.
                </Text>
            </View>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={healthPlanStyles.modalContainer}>
          <View style={healthPlanStyles.modalContent}>
            <LottieView
              autoPlay
              ref={animation}
              loop={false}
              style={{
                width: 100,
                height: 100,
              }}
              source={require('../../assets/Tick Animation.json')}
            />
            <Text style={mainStyles.heading3}>
              Congratulations!
            </Text>
            <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
              You’ve completed the muscle-strengthening exercise. Your activity
              has been tracked and recorded for today.
            </Text>

            <TouchableOpacity
              style={healthPlanStyles.modalButton}
              onPress={handleCompleteExercise}
            >
              <Text style={mainStyles.whiteCaption}>View Health Metrics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={mainStyles.bottomButtonContainer2}>
        <TouchableOpacity style={mainStyles.bottomButton} onPress={handleNextPress}>
          <View style={mainStyles.buttonContent}>
            <Text style={[mainStyles.whiteCaption, healthPlanStyles.exerciseStatusText]}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>

  
    </ScrollView>
  );
}



