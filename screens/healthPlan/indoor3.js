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
      Hamstring Curl. First, set up. Hold onto something for balance.  

      Next, position your feet. Keep the top part of your leg even with the leg you are standing on.

      Next, perform the curl. Pull your heel towards your bottom without bringing your knee up or flexing your hip, then slowly come back down.

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

  return (
    <ScrollView style={[mainStyles.container]}>
        <TouchableOpacity style={mainStyles.backButton2} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#001B62" />
        </TouchableOpacity>

        <View style={[healthPlanStyles.indoorExerciseContainer]}>
            <View style={healthPlanStyles.indoorExerciseTypeContainer}>
                <Text style={[mainStyles.heading3]}>Hamstring Curl</Text>   
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
                    source={require('../../assets/gif/exercise2.gif')}
                    style={healthPlanStyles.exerciseGif}
                />
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Set up</Text>
                <Text style={healthPlanStyles.instructionText}>
                  Hold onto something for balance. 
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Position your feet</Text>
                <Text style={healthPlanStyles.instructionText}>
                  Keep the top part of your leg even with the leg you are standing on. 
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Perform the curl</Text>
                <Text style={healthPlanStyles.instructionText}>
                Pull your heel towards your bottom without bringing your knee up or flexing your hip, then slowly come back down.
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Start slow</Text>
                <Text style={healthPlanStyles.instructionText}>
                    Begin with 10 repetitions and gradually increase to 40.
                </Text>
            </View>
        </View>

      <View style={mainStyles.bottomButtonContainer2}>
      <TouchableOpacity style={mainStyles.bottomButton} onPress={() => navigation.navigate("Indoor4")}>
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



