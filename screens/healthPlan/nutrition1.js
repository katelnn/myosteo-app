import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore configuration file
import mainStyles from "../../stylesheet/mainStyle";
import healthPlanStyles from "../../stylesheet/healthPlanStyle";
import dashboardStyles from '../../stylesheet/dashboardStyle';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Bin from '../../assets/icons/bin.svg';
import CalciumIcon from '../../assets/icons/calciumIcon.svg';
import VitaminDIcon from '../../assets/icons/vitaminDIcon.svg';
import ProteinIcon from '../../assets/icons/proteinIcon.svg';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Nutrient({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [currentScreen, setCurrentScreen] = useState("FoodList");
  const [food, setFood] = useState("");
  const [servings, setServings] = useState(1);
  const [foodList, setFoodList] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showFoodList, setShowFoodList] = useState(true);
  const animation = useRef(null);

  const NUTRITIONIX_API_KEY = 'fcc437814ca98657fd4dd4538a4bcd16';
  const NUTRITIONIX_APP_ID = 'fd508cbe';

  // Handle photo update
  useEffect(() => {
    if (route.params?.photo) {
      setPhoto(route.params.photo.uri);
    }
  }, [route.params?.photo]);

  // Clear fields after submission
  const clearFields = () => {
    setFood("");
    setServings(1);
  };

  //Add food
  const addFood = async () => {
    setModalVisible(true);
  };

  // Add food to Firestore
  const handleAddFood = async () => {
    if (!food || servings < 1) {
      Alert.alert("Error", "Please enter a food item and valid servings.");
      return;
    }
  
    try {
      // Fetch nutrition data from Nutritionix API
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "x-app-id": NUTRITIONIX_APP_ID,
            "x-app-key": NUTRITIONIX_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: `${servings} servings of ${food}` }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok && data.foods && data.foods.length > 0) {
        const nutrition = data.foods[0]; // Extract nutrition data for the first food item
  
        // Create new food object with nutrition data
        const newFood = {
          food,
          servings,
          nutrition,
          photo,
          dateAdded: Timestamp.now(),
        };
  
        // Save food to Firestore
        const docRef = doc(collection(db, "foodItems"));
        await setDoc(docRef, newFood);
  
        // Update local state
        setFoodList([...foodList, newFood]);
        clearFields();
      } else {
        Alert.alert("Error", "No nutrition data found for the entered food.");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      Alert.alert("Error", "There was a problem fetching nutrition data.");
    }
  };

  const calculateTotalNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalcium = 0;
    let totalVitaminD = 0;

    const getNutrientValue = (nutrients, nutrientId, servings) => {
      const nutrient = nutrients.find(n => n.attr_id === nutrientId);
      if (nutrient) {
        return (nutrient.value * servings).toFixed(2);
      }
      return 'Not Available';
    };
  
    foodList.forEach((foodItem) => {
      const { nutrition, servings } = foodItem;
  
      if (nutrition) {
        totalCalories += Math.round(getNutrientValue(nutrition.full_nutrients, 208, servings));
        totalProtein += Math.round(getNutrientValue(nutrition.full_nutrients, 203, servings));
        totalCarbs += Math.round(getNutrientValue(nutrition.full_nutrients, 205, servings));
        totalFat += Math.round(getNutrientValue(nutrition.full_nutrients, 204, servings));
        totalCalcium += Math.round(getNutrientValue(nutrition.full_nutrients, 301, servings));
        totalVitaminD += Math.round(getNutrientValue(nutrition.full_nutrients, 324, servings));
      }
    });
  
    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalCalcium,
      totalVitaminD,
    };
  };

  const deleteFoodItem = (index) => {
    const updatedFoodList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedFoodList);
  };

  const handleSaveFoodList = async () => {
    try {
      // Filter food items to only include the food name and servings
      const simplifiedFoodList = foodList.map((foodItem) => ({
        food: foodItem.food,
        servings: foodItem.servings,
      }));
  
      // Save the simplified food list to AsyncStorage
      await AsyncStorage.setItem('dailyFoodLog', JSON.stringify(simplifiedFoodList));
  
      console.log('Food list saved successfully!');
    } catch (error) {
      console.error('Error saving food list:', error);
      Alert.alert('Error', 'Failed to save your food list.');
    }
  };
  
  // Call this function when saving progress
  const handleNextPress = () => {
    handleSaveFoodList(); // Save the food list
    setModalVisible(true); // Show the modal
  };

  const handleSaveFoodLog = async (newFoodItem) => {
    try {
      // Fetch the existing food log
      const existingLog = await AsyncStorage.getItem('dailyFoodLog');
      const parsedLog = existingLog ? JSON.parse(existingLog) : [];
  
      // Append the new food item to the existing log
      const updatedLog = [...parsedLog, newFoodItem];
  
      // Save the updated log back to AsyncStorage
      await AsyncStorage.setItem('dailyFoodLog', JSON.stringify(updatedLog));
    } catch (error) {
      console.error('Error saving food log:', error);
      Alert.alert('Error', 'Failed to save food log.');
    }
  };
  
  // Call this function when adding a food item
  const handleAddFoodItem = async () => {
    if (!food || servings < 1) {
      Alert.alert('Error', 'Please enter a food item and valid servings.');
      return;
    }
  
    const newFoodItem = { food, servings };
    await handleSaveFoodLog(newFoodItem); // Save the food item to the log
    setFoodList((prevList) => [...prevList, newFoodItem]); // Update local state
    clearFields(); // Reset input fields
    Alert.alert('Success', 'Food item added successfully!');
  };

  const handleViewHealthMetrics = async () => {
    const totals = calculateTotalNutrition();
  
    // Calculate the nutrient progress
    const newCalciumProgress = totals.totalCalcium;
    const newVitaminDProgress = totals.totalVitaminD;
    const newProteinProgress = totals.totalProtein;
  
    console.log("Calcium Progress:", newCalciumProgress);
    console.log("Vitamin D Progress:", newVitaminDProgress);
    console.log("Protein Progress:", newProteinProgress);
  
    // Save totals in AsyncStorage for Dashboard to retrieve later
    try {
      await AsyncStorage.setItem('@calciumProgress', JSON.stringify(newCalciumProgress));
      await AsyncStorage.setItem('@vitaminDProgress', JSON.stringify(newVitaminDProgress));
      await AsyncStorage.setItem('@proteinProgress', JSON.stringify(newProteinProgress));
      console.log('Nutrient progress saved successfully!');
    } catch (error) {
      console.error('Failed to save nutrient progress:', error);
      Alert.alert('Error', 'Failed to save your nutrient progress.');
    }
  
    // Navigate to Dashboard and pass the nutrient progress (if needed)
    navigation.navigate("Home", {
      screen: "Dashboard",
    });
  };
  
  

  if (!fontsLoaded) {
    return null; // Wait until fonts are loaded
  }

  return (
    <ScrollView style={[mainStyles.container]}>
       <TouchableOpacity style={mainStyles.backButton2} onPress={() => navigation.goBack()}>
       <AntDesign name="arrowleft" size={24} color="#7887B0" />
      </TouchableOpacity>
       
      <Text style={[mainStyles.heading3, healthPlanStyles.nutritionIntakeTitle]}>Today's Nutrition Intake</Text>
      {currentScreen === "FoodList" && (
        <>
          {/* Photo Section */}
          <Image
            source={photo ? { uri: photo } : require("../../assets/images/placeholder.png")}
            style={mainStyles.placeholderImage2}
          />
          <View style={mainStyles.buttonContainer}>
            <TouchableOpacity
              style={[mainStyles.button5, mainStyles.cameraButton2]}
              onPress={() => navigation.navigate("AddNutritionPhoto")}
            >
              <View style={[mainStyles.buttonContent]}>
                <Text style={mainStyles.buttonText}>Add Picture</Text>
              </View>
            </TouchableOpacity>
          </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={healthPlanStyles.modalContainer2}>
          <View style={healthPlanStyles.modalContent}>
          <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={healthPlanStyles.closeIcon}
            >
              <Feather name="x" size={30} color="black" />
            </TouchableOpacity>
            <Text style={[mainStyles.heading3, healthPlanStyles.nutritionModalHeading]} >Add Food Item</Text>
            <TextInput
                style={mainStyles.input3}
                placeholder="Enter Food"
                placeholderTextColor="#7887B0"
                value={food}
                onChangeText={setFood}
              />

            <Text style={[mainStyles.heading3, healthPlanStyles.nutritionModalHeading]} >Enter Servings</Text>
            <View style={healthPlanStyles.quantityContainer}>
              <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))} style={healthPlanStyles.quantityIcon}>
                <FontAwesome6 name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                style={mainStyles.input2}
                placeholder="Servings"
                value={String(servings)}
                keyboardType="numeric"
                onChangeText={(value) => {
                  if (value === '') {
                    setServings('');
                  } else {
                    const numericValue = parseInt(value, 10);
                    setServings(numericValue >= 1 ? numericValue : 1);
                  }
                }}
              />
               <TouchableOpacity onPress={() => setServings(servings + 1)} style={healthPlanStyles.quantityIcon}>
                <FontAwesome6 name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={healthPlanStyles.modalContent}>
                <TouchableOpacity
                  style={healthPlanStyles.modalButton2}
                  onPress={async () => {
                    await handleAddFood(); // Add the food
                    setModalVisible(false); // Close the modal
                  }}
                >
                    <Text style={mainStyles.whiteCaption}>Add Food</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>


        {showFoodList && (
          <View style={healthPlanStyles.nutritionContainer}>
            <View style={healthPlanStyles.nutritionHeaderRow}>
              <Text style={healthPlanStyles.nutritionHeaderTitle}>Food List</Text>
              <TouchableOpacity
                style={healthPlanStyles.nutritionAddButton}
                onPress={addFood}
              >
                <Text style={healthPlanStyles.nutritionAddButtonText}>Add Food</Text>
              </TouchableOpacity>
            </View>

            {foodList.length === 0 ? (
              <Text style={healthPlanStyles.nutritionSubText}>
                Add food item and servings to see your nutrients intake!
              </Text>
            ) : null}

            {foodList.map((foodItem, index) => (
              <View key={index} style={healthPlanStyles.foodItemContainer}>
                <View style={healthPlanStyles.foodItemTextContainer}>
                  <Text style={healthPlanStyles.foodName}>{foodItem.food}</Text>
                  <Text style={healthPlanStyles.foodServings}>{foodItem.servings} Serving</Text>
                </View>
                <TouchableOpacity onPress={() => deleteFoodItem(index)}>
                  <Bin width={16} height={16} style={healthPlanStyles.deleteIcon} />
                </TouchableOpacity>
              </View>
            ))}

            {foodList.length === 0 && (
              <View style={mainStyles.disableBottomButtonContainer}>
                <TouchableOpacity
                  style={mainStyles.disableBottomButton3}
                  onPress={handleAddFood}
                >
                  <Text style={mainStyles.buttonText3}>Calculate Nutrient</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

          {foodList.length > 0 && (
            <View style={mainStyles.bottomButtonContainer}>
              <TouchableOpacity
                style={mainStyles.bottomButton}
                onPress={() => {
                  setShowFoodList(false); // Hide food list and related sections
                  setCurrentScreen("NutrientCalculation"); // Navigate to NutrientCalculation screen
                }}
          
                
              >
                <View style={mainStyles.buttonContent}>
                  <Text style={mainStyles.buttonText3}>Calculate Nutrients</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {currentScreen === "NutrientCalculation" && (
        <View style={mainStyles.container}>
          <Image
            source={photo ? { uri: photo } : require("../../assets/images/placeholder.png")}
            style={mainStyles.placeholderImage3}
          />

          {(() => {
            const totals = calculateTotalNutrition();
            return (
              <>
              <Text style={[mainStyles.heading4,healthPlanStyles.nutrientResultHeading]}>My Meal's Nutrient</Text>

              <View style={healthPlanStyles.nutritionCardContainer}>
                <View style={healthPlanStyles.nutritionIconAndLabelContainer}>
                  <View style={healthPlanStyles.nutritionIconContainer}>
                    <CalciumIcon width={24} height={24} />
                  </View>
                  <Text style={healthPlanStyles.nutritionLabelText}>Calcium</Text>
                </View>
                <Text style={healthPlanStyles.nutritionValueText}>{totals.totalCalcium} mg</Text>
              </View>

              <View style={healthPlanStyles.nutritionCardContainer}>
                <View style={healthPlanStyles.nutritionIconAndLabelContainer}>
                  <View style={healthPlanStyles.nutritionIconContainer}>
                    <VitaminDIcon width={24} height={24} />
                  </View>
                  <Text style={healthPlanStyles.nutritionLabelText}>Vitamin D</Text>
                </View>
                <Text style={healthPlanStyles.nutritionValueText}>{totals.totalVitaminD} IU</Text>
              </View>

              <View style={healthPlanStyles.nutritionCardContainer}>
                <View style={healthPlanStyles.nutritionIconAndLabelContainer}>
                  <View style={healthPlanStyles.nutritionIconContainer}>
                    <ProteinIcon width={24} height={24} />
                  </View>
                  <Text style={healthPlanStyles.nutritionLabelText}>Protein</Text>
                </View>
                <Text style={healthPlanStyles.nutritionValueText}>{totals.totalProtein} g</Text>
              </View>
              </>
            );
          })()}

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
                  Meal Logged
                </Text>
                <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
                  Your meal’s nutrients has been tracked and recorded for today.
                </Text>

                <TouchableOpacity
                  style={healthPlanStyles.modalButton}
                  onPress={() => {
                    setModalVisible(false); // Close the modal
                    handleViewHealthMetrics(); // Navigate and pass the nutrient progress
                  }}
                >
                  <Text style={mainStyles.whiteCaption}>View Health Metrics</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={mainStyles.bottomButton4}
            onPress={handleNextPress}
          >
            <View style={mainStyles.buttonContent}>
              <Text style={mainStyles.buttonText3}>Save Progress</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
