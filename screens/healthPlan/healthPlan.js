import { Text, Image, ScrollView, View, TouchableOpacity, Modal
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import React, { useState, useEffect, useRef } from "react";

import healthPlanStyles from "../../stylesheet/healthPlanStyle";
import mainStyles from "../../stylesheet/mainStyle";

import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import dashboardStyles from "../../stylesheet/dashboardStyle";

import DrainedDefault from '../../assets/icons/emoji/drainedDefault.svg';
import DrainedSelected from '../../assets/icons/emoji/drainedSelected.svg';
import TiredDefault from '../../assets/icons/emoji/tiredDefault.svg';
import TiredSelected from '../../assets/icons/emoji/tiredSelected.svg';
import AnxiousDefault from '../../assets/icons/emoji/anxiousDefault.svg';
import AnxiousSelected from '../../assets/icons/emoji/anxiousSelected.svg';
import NeutralDefault from '../../assets/icons/emoji/neutralDefault.svg';
import NeutralSelected from '../../assets/icons/emoji/neutralSelected.svg';
import ActiveDefault from '../../assets/icons/emoji/activeDefault.svg';
import ActiveSelected from '../../assets/icons/emoji/activeSelected.svg';
import EnergizedDefault from '../../assets/icons/emoji/energizedDefault.svg';
import EnergizedSelected from '../../assets/icons/emoji/energizedSelected.svg';

import BackDefault from '../../assets/icons/pain/backDefault.svg';
import BackSelected from '../../assets/icons/pain/backSelected.svg';
import KneeDefault from '../../assets/icons/pain/kneeDefault.svg';
import KneeSelected from '../../assets/icons/pain/kneeSelected.svg';
import HipDefault from '../../assets/icons/pain/hipDefault.svg';
import HipSelected from '../../assets/icons/pain/hipSelected.svg';
import NeckDefault from '../../assets/icons/pain/neckDefault.svg';
import NeckSelected from '../../assets/icons/pain/neckSelected.svg';
import WristDefault from '../../assets/icons/pain/wristDefault.svg';
import WristSelected from '../../assets/icons/pain/wristSelected.svg';
import PainFreeDefault from '../../assets/icons/pain/painFreeDefault.svg';
import PainFreeSelected from '../../assets/icons/pain/painFreeSelected.svg';

import Feather from '@expo/vector-icons/Feather';
import LottieView from "lottie-react-native";
 
export default function HealthPlan() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const route = useRoute();
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]);

  const animation = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); 

  const exerciseTime = 15;

  /*---------------------Emoji----------------------------------------*/

  const [showEmojiMessage, setShowEmojiMessage] = useState(true);
  const [dontShowEmojiAgain, setDontShowEmojiAgain] = useState(false);

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const emojis = [
    { name: 'Drained', icon: <DrainedDefault />, selectedIcon: <DrainedSelected/>, label: 'Drained' },
    { name: 'Tired', icon: <TiredDefault />, selectedIcon: <TiredSelected/>, label: 'Tired' },
    { name: 'Anxious', icon: <AnxiousDefault />, selectedIcon: <AnxiousSelected/>, label: 'Anxious' },
    { name: 'Neutral', icon: <NeutralDefault />, selectedIcon: <NeutralSelected/>, label: 'Neutral' },
    { name: 'Active', icon: <ActiveDefault />, selectedIcon: <ActiveSelected/>, label: 'Active' },
    { name: 'Energized', icon: <EnergizedDefault />, selectedIcon: <EnergizedSelected/>, label: 'Energize' }
  ];

  //This function toggle selection of emojis and then displayed its notification message
  const handleEmojiClick = (emojiName) => {
  // Toggle the selected emoji. Deselect if it's already selected.
  setSelectedEmoji((prev) => (prev === emojiName ? null : emojiName));
};

  //This function close emoji notification message
  const handleEmojiCloseMessage = () => {
    setShowEmojiMessage(false);
  };

  //This function disable emoji notification message
  const toggleDontShowEmojiAgain = () => {
    setDontShowEmojiAgain((prev) => !prev);
  };

  /*---------------------------------Pain----------------------------------------*/
  
  const [selectedPain, setSelectedPain] = useState([]);
  const [showPainMessage, setShowPainMessage] = useState(true);
  const [dontShowPainAgain, setDontShowPainAgain] = useState(false);
  
  const painAreas = [
      { name: 'Back', icon: <BackDefault />, selectedIcon: <BackSelected />, label: 'Back',},
      { name: 'Knees', icon: <KneeDefault />,  selectedIcon: <KneeSelected />, label: 'Knees',},
      { name: 'Hips', icon: <HipDefault />, selectedIcon: <HipSelected />, label: 'Hips', },
      { name: 'Wrists', icon: <WristDefault />, selectedIcon: <WristSelected />, label: 'Wrists',},
      { name: 'Neck', icon: <NeckDefault />, selectedIcon: <NeckSelected />, label: 'Neck',},
      { name: 'PainFree', icon: <PainFreeDefault />, selectedIcon: <PainFreeSelected />, label: 'Pain Free',},
  ];

   //This function toggle selection of pain areas and then displayed its notification message
  const handleSelection = (area) => {
    setSelectedPain((prev) => {
      if (!Array.isArray(prev)) {
        prev = []; // Fallback to an empty array if the previous state is invalid
      }
      if (prev.includes(area)) {
        // Remove the area if it's already selected
        return prev.filter((item) => item !== area);
      } else {
        // Add the area to the selection
        return [...prev, area];
      }
    });
    setShowPainMessage(true); // Show notification message
  };
  
//This function close pain areas notification message
const handlePainCloseMessage = () => {
  setShowPainMessage(false);
};

 //This function disable pain areas notification message
const toggleDontShowPainAgain = () => {
  setDontShowPainAgain((prev) => !prev);
};

const handleNextPress = () => {
  setModalVisible(true);
};

  useEffect(() => {
    //This function retrieves all medication records from the Firestore
    const fetchMedications = async () => {
      try {
        const medicationsCollection = collection(db, "medications");
        const medicationsSnapshot = await getDocs(medicationsCollection);
        const medicationsList = medicationsSnapshot.docs.map(doc => doc.data());
        setMedications(medicationsList);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };
  
    if (route.params?.newMedication) {
      //This function saves a new medication
      const saveMedication = async () => {
        try {
          const medicationsCollection = collection(db, "medications");
          await addDoc(medicationsCollection, route.params.newMedication);
          setMedications(prev => [...prev, route.params.newMedication]);
        } catch (error) {
          console.error("Error saving medication:", error);
        }
      };
      saveMedication();
    } else {
      fetchMedications();
    }
  }, [route.params?.newMedication]);

  if (!fontsLoaded) {
    return null; // Return null if fonts are not loaded
  }

  

  

  return (
    <ScrollView style={[mainStyles.container]}>
      {/* Overview */}
      <Image
        source={require("../../assets/icons/healthPlan2.png")}
        style={mainStyles.heroIcon2}
      />
      <Text style={mainStyles.heading1}>Health Trackers</Text>
      <Text
        style={[mainStyles.paragraph, healthPlanStyles.overallPlanParagraph]}
      >
        Health activities are personalized for you. Select, complete, and log your progress.
      </Text>

      {/* Exercise */}
      <Text style={mainStyles.heading1}>Recommended Exercise</Text>
      {/* <Text
        style={[mainStyles.paragraph, healthPlanStyles.overallExerciseParagraph]}
      >
        Your Goal: 20 mins of Exercise
      </Text> */}

  {/* Indoor */}
  <View style={healthPlanStyles.exerciseContainer}>
    <Image
      source={require("../../assets/images/indoor.png")}
      style={healthPlanStyles.exerciseImage}
    />
    <Text style={mainStyles.heading3}>Muscle Strengthening</Text>
    <View style={healthPlanStyles.exerciseSubContainer}>
      <Text style={[mainStyles.caption, healthPlanStyles.exerciseType]}> Indoor</Text>
      <View style={healthPlanStyles.durationContainer}>
        <AntDesign name="clockcircle" size={14} color="#001B62" />
        <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
          15 mins
        </Text>
      </View>
      <TouchableOpacity
        style={[mainStyles.button3, healthPlanStyles.learnExerciseButton]}
        onPress={() => {navigation.navigate("Indoor1")}}
      >
        <View style={mainStyles.buttonContent}>
          <Text style={mainStyles.buttonText4}>View More</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>

   {/* Ourdoor */}
   <View style={healthPlanStyles.exerciseContainer}>
      <Image
            source={require("../../assets/images/outdoor.png")}
            style={healthPlanStyles.exerciseImage}
      />
      <Text style={mainStyles.heading3}>Short Walk</Text>
      <View style={healthPlanStyles.exerciseSubContainer}>
        <Text style={[mainStyles.caption, healthPlanStyles.exerciseType]}> Outdoor</Text>
        <View style={healthPlanStyles.durationContainer}>
          <AntDesign name="clockcircle" size={14} color="#001B62" />
          <Text style={[mainStyles.caption, healthPlanStyles.exerciseTotalTime]}>
          {exerciseTime} mins
          </Text>
        </View>
        <TouchableOpacity
          style={[mainStyles.button3, healthPlanStyles.learnExerciseButton]}
          onPress={() => navigation.navigate("Outdoor1", {exerciseTime})}
        >
          <View style={mainStyles.buttonContent}>
            <Text style={mainStyles.buttonText4}>View More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

 
      

      {/* Nutrition */}
      <Text
        style={[mainStyles.heading1, healthPlanStyles.healthTitle]}
      >
        Nutrition Intake
      </Text>
      <Text
        style={[mainStyles.paragraph, healthPlanStyles.overallPlanParagraph]}
      >
        View your nutrition intake using the meal calculator.
      </Text>

      {/* View Log Button */}
      <View style={mainStyles.buttonContainer}>
        <TouchableOpacity
          style={mainStyles.button6}
          onPress={() => navigation.navigate("Nutrition1")}
        >
          <View style={mainStyles.buttonContent}>
            <Text style={mainStyles.buttonText2}>Add Meal</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/*Feeling and Emoji*/}
      <View style={dashboardStyles.feelingContainer}>
        <Text style={[mainStyles.heading1, dashboardStyles.feelingTitle]}>
          How are you feeling today?
        </Text>
        <Text style={[mainStyles.paragraph, dashboardStyles.feelingParagraph]}>
          Track your feelings daily to observe changes in your osteoporosis management.
        </Text>
      </View>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={dashboardStyles.emojiContainer}
      >
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[
              dashboardStyles.singleEmojiContainer,
              selectedEmoji === emoji.name && dashboardStyles.selectedEmoji // Apply styles for selected emoji
            ]}
            onPress={() => handleEmojiClick(emoji.name)}
          >
            <View style={[
              dashboardStyles.emojiIconContainer,
              selectedEmoji === emoji.name && dashboardStyles.selectedEmojiIcon,
            ]}>
              {selectedEmoji === emoji.name ? emoji.selectedIcon : emoji.icon}
            </View>
            <Text
              style={[
                mainStyles.caption,
                dashboardStyles.emojiLabel,
                selectedEmoji === emoji.name && dashboardStyles.selectedEmojiText, // Apply selected text style
              ]}
            >
              {emoji.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedEmoji && (
  <View style={mainStyles.buttonContainer2}>
    <TouchableOpacity
      style={mainStyles.button6}
      onPress={() => {
        setModalType("emoji");
        setModalVisible(true);
      }}
    >
      <View style={mainStyles.buttonContent}>
        <Text style={mainStyles.buttonText2}>Log Selection</Text>
      </View>
    </TouchableOpacity>
  </View>
)}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setModalType(null);
          }}
        >
          <View style={healthPlanStyles.modalContainer}>
            <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={healthPlanStyles.closeIcon2}
              >
                <Feather name="x" size={30} color="black" />
              </TouchableOpacity>
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
              {modalType === "emoji" && (
                <>
                  <Text style={mainStyles.heading3}>Feeling Tracked</Text>
                  <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
                    Your selection has been tracked and recorded for today. Press “View Today's Log” for a summary of your entries.
                  </Text>
                </>
              )}
              {modalType === "pain" && (
                <>
                  <Text style={mainStyles.heading3}>Pain Tracked</Text>
                  <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
                    Your selection has been tracked and recorded for today. Press “View Today's Log” for a summary of your entries.
                  </Text>
                </>
              )}

<TouchableOpacity
  style={healthPlanStyles.modalButton}
  onPress={() => {
    if (selectedEmoji || selectedPain.length > 0) {
      // Close the modal and pass the emoji and selected pain areas to DailyLog
      setModalVisible(false);
      navigation.navigate("DailyLog", { 
        selectedEmoji, 
        selectedPain // Pass selectedPain array as well
      });
    } else {
      alert("Please select at least an emoji or a pain area before logging!"); // Alert if neither is selected
    }
  }}
>
  <Text style={mainStyles.whiteCaption}>View Today's Log</Text>
</TouchableOpacity>
            
            </View>
          </View>
        </Modal>
      
       
       {/* Pain Selection Section */}
       <View style={dashboardStyles.painGridContainer}>
        <Text style={[mainStyles.heading1, dashboardStyles.feelingTitle]}>
          Where are you feeling pain today?
        </Text>
        <Text style={[mainStyles.paragraph, dashboardStyles.feelingParagraph]}>
          Recognizing pain patterns helps track daily changes, guide treatment, and manage discomfort.
        </Text>

        {/* Pain Areas */}

        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={dashboardStyles.painContainer}
        >
        {painAreas.map((painArea, index) => (
          <TouchableOpacity
            key={index}
            style={[
              dashboardStyles.painSelectionContainer,
              selectedPain.includes(painArea.name) ? dashboardStyles.selectedPain : {}, // Highlight if selected
            ]}
            onPress={() => handleSelection(painArea.name)}
          >
          <View style={dashboardStyles.painIconContainer}>
            {selectedPain.includes(painArea.name) ? painArea.selectedIcon : painArea.icon}
          </View>
          <Text
            style={[
              mainStyles.caption,
              dashboardStyles.painLabel,
              selectedPain.includes(painArea.name) && dashboardStyles.selectedPainText, // Apply text style if selected
            ]}
          >
            {painArea.label}
          </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {selectedPain.length > 0 && (
        <View style={mainStyles.buttonContainer2}>
          <TouchableOpacity
            style={mainStyles.button6}
            onPress={() => {
              setModalType("pain");
              setModalVisible(true);
            }}
      
          >
            <View style={mainStyles.buttonContent}>
              <Text style={mainStyles.buttonText2}>Log Selection</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
       

       {/* Notes */}
       <View style={healthPlanStyles.prescriptionContainer}>
        <Text style={mainStyles.heading1}>Notes</Text>
        <Text style={[mainStyles.paragraph, healthPlanStyles.overallNoteParagraph]}>
          Log your notes to track important details throughout the day.
        </Text>
        <TouchableOpacity
          style={mainStyles.button6}
          onPress={() => navigation.navigate("AddMedication")}
        >
          <View style={mainStyles.buttonContent}>
            <Text style={mainStyles.buttonText2}>Add Notes</Text>
          </View>
        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

       
      </View>
    </ScrollView>
  );
}
