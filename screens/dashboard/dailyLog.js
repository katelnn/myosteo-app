import { Text, Image, ScrollView, View, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dashboardStyles from '../../stylesheet/dashboardStyle';
import healthPlanStyles from "../../stylesheet/healthPlanStyle";
import mainStyles from '../../stylesheet/mainStyle';
import { Ionicons } from '@expo/vector-icons';

import ProgressBar from '../../component/progressBar'; 
import Notification from '../../component/notification';
import AntDesign from '@expo/vector-icons/AntDesign';


import { useNavigation, useRoute } from '@react-navigation/native'; 

import DrainedSelected from '../../assets/icons/emoji/drainedSelected.svg';
import TiredSelected from '../../assets/icons/emoji/tiredSelected.svg';
import AnxiousSelected from '../../assets/icons/emoji/anxiousSelected.svg';
import NeutralSelected from '../../assets/icons/emoji/neutralSelected.svg';
import ActiveSelected from '../../assets/icons/emoji/activeSelected.svg';
import EnergizedSelected from '../../assets/icons/emoji/energizedSelected.svg';

import BackSelected from '../../assets/icons/pain/backSelected.svg';
import KneeSelected from '../../assets/icons/pain/kneeSelected.svg';
import HipSelected from '../../assets/icons/pain/hipSelected.svg';
import NeckSelected from '../../assets/icons/pain/neckSelected.svg';
import WristSelected from '../../assets/icons/pain/wristSelected.svg';
import PainFreeSelected from '../../assets/icons/pain/painFreeSelected.svg';


export default function Dashboard({}) {
  const navigation = useNavigation(); 

  const [firstName, setFirstName] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // Define the state for selected emoji
  const [selectedPain, setSelectedPain] = useState([]);
  const [notes, setNotes] = useState([]);
  const [dailyLog, setDailyLog] = useState([]);
  const [foodLog, setFoodLog] = useState([]);

  const route = useRoute();

  const emojiIcons = {
    Drained: <DrainedSelected width={60} height={60} />,
    Tired: <TiredSelected width={60} height={60} />,
    Anxious: <AnxiousSelected width={60} height={60} />,
    Neutral: <NeutralSelected width={60} height={60} />,
    Active: <ActiveSelected width={60} height={60} />,
    Energized: <EnergizedSelected width={60} height={60} />,
  };

  const painIcons = {
    Back: <BackSelected width={60} height={60} />,
    Knees: <KneeSelected width={60} height={60} />,
    Hips: <HipSelected width={60} height={60} />,
    Neck: <NeckSelected width={60} height={60} />,
    Wrists: <WristSelected width={60} height={60} />,
    PainFree: <PainFreeSelected width={60} height={60} />,
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Uses the default locale
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("@user_name");
        if (name) setFirstName(name);
      } catch (e) {
        console.error("Failed to load user data:", e);
      }
    };

    const fetchSelections = async () => {
      try {
        const emojiFromParams = route.params?.selectedEmoji;
        const painFromParams = route.params?.selectedPain;

        if (emojiFromParams) {
          setSelectedEmoji(emojiFromParams); // Use the setter to update emoji
          await AsyncStorage.setItem("@selected_emoji", emojiFromParams); // Save emoji for persistence
        } else {
          const emojiFromStorage = await AsyncStorage.getItem("@selected_emoji");
          setSelectedEmoji(emojiFromStorage || null);
        }

        if (painFromParams) {
          setSelectedPain(painFromParams); // Update selected pain areas
          await AsyncStorage.setItem("@selected_pain", JSON.stringify(painFromParams)); // Save pain areas
          
        } else {
          const painFromStorage = await AsyncStorage.getItem("@selected_pain");
          setSelectedPain(painFromStorage ? JSON.parse(painFromStorage) : []);
        }
      } catch (e) {
        console.error("Failed to fetch selections:", e);
      }
    };

    const fetchNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem("@notes");
        setNotes(savedNotes ? JSON.parse(savedNotes) : []);
      } catch (error) {
        console.error("Failed to load notes:", error);
      }
    };

    const fetchDailyLog = async () => {
      try {
        const log = await AsyncStorage.getItem("dailyLog");
        setDailyLog(log ? JSON.parse(log) : []);
      } catch (error) {
        console.error("Failed to load daily log:", error);
      }
    };

    const fetchFoodLog = async () => {
      try {
        const savedFoodLog = await AsyncStorage.getItem('dailyFoodLog');
        if (savedFoodLog) {
          setFoodLog(JSON.parse(savedFoodLog));
        }
      } catch (error) {
        console.error('Error fetching food log:', error);
      }
    };

    // Add the new note if passed from AddMedication.js
    if (route.params?.newNote) {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, route.params.newNote];
        AsyncStorage.setItem("@notes", JSON.stringify(updatedNotes)); // Save notes for persistence
        return updatedNotes;
      });
    }

    fetchFoodLog();
    fetchNotes();
    fetchUserData();
    fetchSelections();
    fetchDailyLog();
  }, [route.params?.selectedEmoji, route.params?.selectedPain, route.params?.newNote]);


  return (
    <ScrollView style={mainStyles.container}>
      {/*Profile Card*/}
      <TouchableOpacity style={mainStyles.backButton2} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#001B62" />
        </TouchableOpacity>

        <Text></Text>
        <Text></Text>

      <View style={dashboardStyles.profileContainer}>
    
        <View style={dashboardStyles.profileInfoContainer}>
          <Text style={mainStyles.heading3}>Welcome, {firstName}!</Text>
          <Text style={[mainStyles.labelText, dashboardStyles.date]}>{getCurrentDate()}</Text>
        </View>
      </View>

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>


      {/* Exercise Section */}
      <Text style={styles.sectionTitle}>Exercise</Text>
      {dailyLog.length > 0 ? (
        dailyLog.map((entry, index) => (
          <View key={index} style={styles.logEntry}>
            <Text style={styles.checkIcon}>✔</Text>
            <Text style={styles.activityText}>{entry.type}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noLogText}>No activity logged yet!</Text>
      )}

      {/* Nutrition Section */}
      <Text style={[styles.sectionTitle,styles.nutritionTitle]}>Nutrition</Text>
      {foodLog.length > 0 ? (
        <View style={styles.foodListContainer}>
          {foodLog.map((item, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodName}>{item.food}</Text>
              <Text style={styles.foodServings}>{item.servings} Serving</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noLogText}>No food logged yet!</Text>
      )}

<View style={styles.sectionContainer}>
  {/* Feeling Section */}
  <Text style={styles.sectionTitle}>How I feel today</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Dynamically Render Emoji */}
          {emojiIcons[selectedEmoji] || <Text style={styles.cardText}>No Emoji</Text>}
          <Text style={styles.cardText}>{selectedEmoji}</Text>
        </View>
      </View>
    </View>

     {/* Pain Section */}
     <Text style={styles.sectionTitle}>Where I'm feeling pain</Text>
    <View style={styles.cardContainer}>
      {selectedPain.map((pain, index) => (
        <View key={index} style={styles.card}>
          {/* Dynamically Render Pain Icons */}
          {painIcons[pain] ? painIcons[pain] : <Text style={styles.cardText}>No Icon</Text>}
          <Text style={styles.cardText}>{pain}</Text>
        </View>
      ))}
    </View>


   
      {/* Note*/}
      <Text style={[mainStyles.heading3, dashboardStyles.feelingTitle]}>
        Notes
      </Text>

{notes.length > 0 ? (
          notes.map((notes, index) => (
            <View
              key={index}
              style={healthPlanStyles.prescriptionNoteContainer}
            >
              <View style={healthPlanStyles.noteTextContainer}>
                <Text style={healthPlanStyles.noteTitle}>
                  {notes.pillName}
                </Text>
                <Text style={healthPlanStyles.noteInstructions}>
                  {notes.instruction}
                </Text>
              </View>
              
            </View>
          ))
        ) : (
          <Text style={[mainStyles.paragraph,healthPlanStyles.noMedication]}>{/*No medications added yet.*/}</Text>
        )}

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 50,
    marginVertical: 20,
  },
  noEmoji: {
    fontSize: 16,
    color: "#999",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#001B62', // Deep blue color
    marginTop: 100,
  },

  nutritionTitle:{
    marginTop: 80,
    marginBottom: -5,
  },

  logEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2FF', // White background
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    hadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    width: '94%',
  
  },
  checkIcon: {
    fontSize: 16,
    color: '#1E90FF', // Blue checkmark
    marginRight: 10,
    marginLeft: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#001B62',
    fontWeight: '500',
  },
  foodListContainer: {
    marginTop: 20,
    marginBottom: 80,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F2FF', // White background
    borderRadius: 10,
    padding: 15,
    marginBottom: 1,
    hadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '94%',
  },
  foodName: {
    fontSize: 16,
    color: '#001B62',
    fontFamily: 'Poppins_500Medium',
    marginLeft: 10,
  },
  foodServings: {
    fontSize: 14,
    color: '#6B7280', 
    marginRight: 10,

  },
  noLogText: {
    fontSize: 14,
    color: '#6B7280', // Light gray for "no data" text
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    color: '#001B62',
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 80,
  },
  card: {
    width: 100,
    height: 120,
    backgroundColor: '#D5DBF2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: "#001B62",
    borderWidth: 3,
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#001B62',
    fontWeight: '500',
    textAlign: 'center',
  },
});
