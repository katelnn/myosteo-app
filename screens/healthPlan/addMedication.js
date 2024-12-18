import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import mainStyles from "../../stylesheet/mainStyle";
import contactStyles from "../../stylesheet/contactStyle";
import healthPlanStyles from "../../stylesheet/healthPlanStyle";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore configuration file
import LottieView from "lottie-react-native";

export default function AddMedication({ route, navigation }) {
  // Fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // State Variables
  const [pillName, setPillName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [newMedication, setNewMedication] = useState(null); // Store the created medication
  const animation = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Clear input fields
  const clearFields = () => {
    setPillName("");
    setInstruction("");
  };

  // Handle adding medication to Firestore and save it locally
  const handleDonePress = async () => {
    if (!pillName || !instruction) {
      return;
    }

    const medication = {
      pillName,
      instruction,
      dateAdded: Timestamp.now(),
    };

    try {
      const docRef = doc(collection(db, "medications")); // Create a new document in Firestore
      await setDoc(docRef, medication);

      setNewMedication(medication); // Save medication locally in state
      console.log("New Medication:", medication);
      clearFields();
      setModalVisible(true); // Show success modal
    } catch (error) {
      console.error("Error adding medication:", error);
      Alert.alert("Error", "There was a problem adding the medication.");
    }
  };

  if (!fontsLoaded) {
    return null; // Return null if fonts are not loaded
  }

  return (
    <ScrollView style={[mainStyles.container]}>
      <TouchableOpacity
        style={mainStyles.backButton2}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="#001B62" />
      </TouchableOpacity>

      <Text
        style={[mainStyles.heading3, healthPlanStyles.nutritionIntakeTitle]}
      >
        Add today's note
      </Text>

      {/* Input Fields */}
      <View style={healthPlanStyles.inputNoteContainer}>
        <TextInput
          style={mainStyles.input5}
          placeholder="Note Title"
          value={pillName}
          onChangeText={setPillName}
        />
        <TextInput
          style={mainStyles.input4}
          placeholder="Enter Notes Here"
          multiline={true}
          value={instruction}
          onChangeText={setInstruction}
        />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              style={{ width: 100, height: 100 }}
              source={require("../../assets/Tick Animation.json")}
            />
            <Text style={mainStyles.heading3}>Notes Logged</Text>
            <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
              Your notes are saved for today. Press “View Today’s Log” for a
              summary of your entries.
            </Text>

            <TouchableOpacity
              style={healthPlanStyles.modalButton}
              onPress={() => {
                setModalVisible(false); // Close the modal
                navigation.navigate("DailyLog", {
                  newNote: newMedication, // Pass the saved note to DailyLog
                });
              }}
            >
              <Text style={mainStyles.whiteCaption}>View Today's Log</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Done Button */}
      <View style={mainStyles.bottomButtonContainer}>
        <TouchableOpacity
          style={mainStyles.bottomButton}
          onPress={handleDonePress}
        >
          <View style={mainStyles.buttonContent}>
            <Text style={mainStyles.buttonText3}>Save Note</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}