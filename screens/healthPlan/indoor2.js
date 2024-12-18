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

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/background.mp3'), 
        { shouldPlay: false, isLooping: true } 
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleNextPress = () => {
    setModalVisible(true);
  };

   // Function to fade out the music
   const fadeOutMusic = async () => {
    if (!sound) return;

    try {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        for (let i = 1; i >= 0; i -= 0.1) {
          await sound.setVolumeAsync(i);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        await sound.stopAsync(); // Stop the music after fading out
        console.log("Music stopped after fade-out.");
      }
    } catch (error) {
      console.error("Error during fade-out:", error);
    }
  };

   // Function to fade in the music
   const fadeInMusic = async () => {
    if (sound) {
      await sound.playAsync(); // Make sure the music is playing
      // Gradually increase volume to 1 over 2 seconds
      for (let i = 0; i <= 1; i += 0.1) {
        await sound.setVolumeAsync(i);
        await new Promise(resolve => setTimeout(resolve, 200)); // wait 200ms for each step
      }
    }
  };

  // Function to play the music for 10 seconds
  const playMusicFor10Seconds = async () => {
    if (!sound) {
        console.error("Sound object is not initialized.");
        return;
      }
    
      console.log("Starting background music...");
      
      try {
        // Ensure the sound is loaded and ready
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
          console.error("Sound is not loaded.");
          return;
        }
    
        if (status.isPlaying) {
          await sound.stopAsync();
        }

         // Reset volume to full before playing
        await sound.setVolumeAsync(1);
    
        // Start playing music
        await sound.playAsync();
        console.log("Music started playing.");
    
        // Wait for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));
    
        // Fade out music
        console.log("Fading out music...");
        await fadeOutMusic();
        console.log("Music faded out.");
      } catch (error) {
        console.error("Error during music playback:", error);
      }
  };

    // Function to start reading the article
    const handleReadInstruction = async () => {
        if (isSpeaking) {
          // Stop reading and reset
          Speech.stop();
          setIsSpeaking(false);
          if (sound) {
            await sound.stopAsync();
            await sound.setVolumeAsync(1);
          }
          return;
        }
        
        let instructions; // Use 'let' to allow reassignment
        if (isMuted) { // Check if not muted
          instructions = [
            "Hamstring Curl. First, set up. Hold onto something for balance.",
            "Next, position your feet. Keep the top part of your leg even with the leg you are standing on.",
            "Next, perform the curl. Pull your heel towards your bottom without bringing your knee up or flexing your hip, then slowly come back down.",
            "Lastly, start slow. Begin with 10 repetitions and gradually increase to 40.",
          ];
        } else {
          instructions = []; // Set to an empty array if muted
        }
              
        setIsSpeaking(true);
      
        try {
          for (let i = 0; i < instructions.length; i++) {
            console.log(`Speaking instruction ${i + 1}: ${instructions[i]}`);
            
            // Speak the current instruction
            await speakAsync(instructions[i]);
      
            console.log(`Finished speaking instruction ${i + 1}`);
      
            // If not the last instruction, play music for 10 seconds
            if (i < instructions.length - 1) {
              console.log("Playing music for 10 seconds...");
              await playMusicFor10Seconds();
              console.log("Finished playing music.");
            }
          }
      
          // After the last instruction, keep the music playing
          console.log("Continuing background music after the last instruction...");
          await keepMusicPlayingIndefinitely();
        } catch (error) {
          console.error("Error during reading instructions:", error);
        }
      
        setIsSpeaking(false); // Mark the session as complete
      };

    // Wrapper for Speech.speak to work with async/await
    const speakAsync = (text) => {
        return new Promise((resolve) => {
        Speech.speak(text, {
            language: "en",
            rate: 1,
            onDone: resolve, // Resolve the promise when speech is done
            onError: resolve, // Also resolve in case of errors to prevent hanging
        });
        });
    };

    const keepMusicPlayingIndefinitely = async () => {
        if (!sound) {
          console.error("Sound object is not initialized.");
          return;
        }
      
        try {
          const status = await sound.getStatusAsync();
          if (!status.isLoaded) {
            console.error("Sound is not loaded.");
            return;
          }
      
          // Ensure the sound is looping
          await sound.setIsLoopingAsync(true);
          await sound.setVolumeAsync(1);
      
          if (!status.isPlaying) {
            console.log("Starting background music indefinitely...");
            await sound.playAsync();
          }
        } catch (error) {
          console.error("Error keeping music playing indefinitely:", error);
        }
      };

    const handleStopReading = async () => {
        Speech.stop();
        setIsSpeaking(false);
        if (sound) {
          await sound.stopAsync(); // Stop the music if needed
          await sound.setVolumeAsync(1); // Reset volume to full after stopping
        }
      };

      const toggleSound = async () => {
        if (isMuted) {
            // Unmute: Resume text-to-speech
            setIsMuted(false);
            if (!isSpeaking) {
                await handleReadInstruction(); // Resume reading if not already speaking
            }
        } else {
            // Mute: Pause text-to-speech
            setIsMuted(true);
            if (isSpeaking) {
                Speech.stop(); // Stop the current TTS playback
                setIsSpeaking(false); // Mark TTS as not speaking
            }
        }
    };

  const handleIconPress = () => {
    toggleSound(); // Toggle the sound state
    handleReadInstruction(); // Start reading instructions
  };

  /*--------------------------------------------------------------------------*/

  const handleReadArticle2 = () => {
    const articleText = 
    `
      Chair Squat. First, set your target. Find a sturdy chair or couch to aim for during the squat. 

      Next, position your feet. Stand with feet slightly wider than shoulder-width apart.

      Next, perform the squat. Bend your knees, keeping them behind your toes, and tap the chair with your bottom without sitting down.

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
                <Text style={[mainStyles.heading3]}>Chair Squat</Text>   
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
                    source={require('../../assets/gif/exercise1.gif')}
                    style={healthPlanStyles.exerciseGif}
                />
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Set your target</Text>
                <Text style={healthPlanStyles.instructionText}>
                Find a sturdy chair or couch to aim for during the squat. 
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Position your feet</Text>
                <Text style={healthPlanStyles.instructionText}>
                Stand with feet slightly wider than shoulder-width apart.
                </Text>
            </View>

            <View style={healthPlanStyles.indoorInstructionContainer}>
                <Text style={healthPlanStyles.instructionTitle2}>Perform the squat</Text>
                <Text style={healthPlanStyles.instructionText}>
                Bend your knees, keeping them behind your toes, and tap the chair with your bottom without sitting down.
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
      <TouchableOpacity style={mainStyles.bottomButton} onPress={() => navigation.navigate("Indoor3")}>
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



