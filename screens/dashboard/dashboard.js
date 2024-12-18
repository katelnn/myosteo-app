import { Text, Image, ScrollView, View, Modal, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dashboardStyles from '../../stylesheet/dashboardStyle';
import healthPlanStyles from "../../stylesheet/healthPlanStyle";
import mainStyles from '../../stylesheet/mainStyle';

import ProgressBar from '../../component/progressBar'; 
import Notification from '../../component/notification';

import { useNavigation, useRoute } from '@react-navigation/native'; 

export default function Dashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const animation = useRef(null);

  // States for user information
  const [firstName, setFirstName] = useState(null);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [gender, setGender] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // States for health metrics
  const [calciumIntake, setCalciumIntake] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [vitaminDIntake, setVitaminDIntake] = useState(0);

  const [calciumProgress, setCalciumProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [vitaminDProgress, setVitaminDProgress] = useState(0);

  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [exerciseGoal, setExerciseGoal] = useState(30);

  const [timeLeft, setTimeLeft] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const loadInitialProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('@exerciseProgress');
        const initialProgress = storedProgress ? parseInt(storedProgress, 10) : 0;
        setExerciseProgress(initialProgress); // Load persisted progress
      } catch (error) {
        console.error('Error loading initial progress:', error);
      }
    };
  
    loadInitialProgress();
  }, []); // Runs once when the component mounts
  
  useEffect(() => {
    if (route.params?.exerciseIncrement) {
      setExerciseProgress((prevProgress) => {
        const newProgress = prevProgress + route.params.exerciseIncrement;
        console.log('Previous Progress:', prevProgress);
        console.log('Increment:', route.params.exerciseIncrement);
        console.log('New Progress:', newProgress);
  
        // Save updated progress to AsyncStorage
        AsyncStorage.setItem('@exerciseProgress', newProgress.toString()).catch((error) =>
          console.error('Error saving progress:', error)
        );
  
        // Cap the progress at the goal
        return newProgress > exerciseGoal ? exerciseGoal : newProgress;
      });
  
      // Clear the parameter to prevent repeated updates
      navigation.setParams({ exerciseIncrement: null });
    }
  }, [route.params?.exerciseIncrement]);


  // Calculate time left in the day
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const difference = endOfDay - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft(`${hours}h   ${minutes}m   ${seconds}s`);
    } else {
      setTimeLeft("0h   0m   0s");
    }
  };

  // Function to calculate intakes
  const calculateCalciumIntake = (age, gender) => {
    if (!age || !gender) return 0;
    if (gender === 'Female') {
      return age > 50 ? 1200 : 1000;
    } else if (gender === 'Male') {
      return age > 70 ? 1200 : 1000;
    }
    return 1000;
  };

  const calculateProteinIntake = (weight, weightUnit) => {
    if (!weight || !weightUnit) return 0;
    const weightInKg = weightUnit === 'kg' ? weight : weight * 0.453592;
    return Math.round(weightInKg * 0.8);
  };

  const calculateVitaminDIntake = (age) => {
    return age >= 70 ? 600 : 800;
  };

  // Fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('@user_name');
      const userAge = await AsyncStorage.getItem('@user_age');
      const userWeight = await AsyncStorage.getItem('@user_weight');
      const userWeightUnit = await AsyncStorage.getItem('@user_weight_unit');
      const userGender = await AsyncStorage.getItem('@user_gender');
      const savedPhoto = await AsyncStorage.getItem('@profile_photo');

      if (name) setFirstName(name);
      if (userAge) setAge(parseInt(userAge, 10));
      if (userWeight) setWeight(parseFloat(userWeight));
      if (userWeightUnit) setWeightUnit(userWeightUnit);
      if (userGender) setGender(userGender);
      if (savedPhoto) setProfilePhoto(JSON.parse(savedPhoto).uri);

      console.log('Age:', userAge, 'Weight:', userWeight, 'Gender:', userGender);
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  };

  useEffect(() => {
    fetchUserData();
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recalculate intakes when user data changes
  useEffect(() => {
    if (age && weight && gender) {
      const calcium = calculateCalciumIntake(Number(age), gender);
      const protein = calculateProteinIntake(Number(weight), weightUnit);
      const vitaminD = calculateVitaminDIntake(Number(age));
      const calciumTarget = calculateCalciumIntake(age, gender);
      const proteinTarget = calculateProteinIntake(weight, weightUnit);
      const vitaminDTarget = calculateVitaminDIntake(age);


      setCalciumIntake(calcium);
      setProteinIntake(protein);
      setVitaminDIntake(vitaminD);

      console.log('Calcium Intake:', calcium, 'Protein Intake:', protein);

      setCalciumProgress((prev) => Math.min(prev, calciumTarget)); // Example increment
      setProteinProgress((prev) => Math.min(prev, proteinTarget)); // Example increment
      setVitaminDProgress((prev) => Math.min(prev, vitaminDTarget)); // Example increment
    }
  }, [age, weight, gender, weightUnit]);

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const fetchHealthMetrics = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dailyFoodLog');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Extract cumulative totals for nutrients
        const totalCalcium = parsedData.reduce((sum, item) => sum + (item.calcium || 0), 0);
        const totalVitaminD = parsedData.reduce((sum, item) => sum + (item.vitaminD || 0), 0);
        const totalProtein = parsedData.reduce((sum, item) => sum + (item.protein || 0), 0);

        // Update state
        setCalciumProgress(totalCalcium);
        setVitaminDProgress(totalVitaminD);
        setProteinProgress(totalProtein);
      }
    } catch (error) {
      console.error('Failed to fetch health metrics:', error);
    }
  };

  // UseEffect to initialize data on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const calcium = await AsyncStorage.getItem('@calciumProgress');
        const vitaminD = await AsyncStorage.getItem('@vitaminDProgress');
        const protein = await AsyncStorage.getItem('@proteinProgress');
  
        setCalciumProgress(calcium ? JSON.parse(calcium) : 0);
        setVitaminDProgress(vitaminD ? JSON.parse(vitaminD) : 0);
        setProteinProgress(protein ? JSON.parse(protein) : 0);
  
        console.log('Fetched nutrient progress from AsyncStorage.');
      } catch (error) {
        console.error('Failed to fetch nutrient progress:', error);
      }
    };
  
    fetchProgress();
  }, []);

  return (
    <ScrollView style={mainStyles.container}>

      {/* Profile Card */}
      <View style={dashboardStyles.profileContainer}>
        {profilePhoto ? (
          <Image
            source={{ uri: profilePhoto }}
            style={[mainStyles.heroIcon, { borderRadius: 100 }]} // Profile photo
          />
        ) : (
          <Image
            source={require('../../assets/icons/profile.png')} // Default profile icon
            style={mainStyles.heroIcon}
          />
        )}
        <View style={dashboardStyles.profileInfoContainer}>
          <Text style={mainStyles.heading3}>Welcome, {firstName}!</Text>
          <Text style={[mainStyles.labelText, dashboardStyles.date]}>{getCurrentDate()}</Text>
        </View>
      </View>


      {/* View Log Button */}
      <View style={mainStyles.buttonContainer}>
        <TouchableOpacity
          style={[mainStyles.button2, dashboardStyles.dailyLogButton]}
          onPress={() => navigation.navigate('DailyLog')}
        >
          <View style={mainStyles.buttonContent}>
            <Text style={mainStyles.buttonText}>View Today's Log</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Health Metrics */}
      <Text style={[mainStyles.heading2, dashboardStyles.metricHeading]}>Health Metrics</Text>
      <Text style={mainStyles.paragraph}>
        Track your health metrics and stay in the green bar for optimal bone health.
      </Text>
      
      
      <ProgressBar progress={exerciseProgress} goal={exerciseGoal} icon="run" taskName="Exercise" />
      <ProgressBar progress={calciumProgress} goal={calciumIntake || 1} taskName="Calcium Intake" />
      <ProgressBar progress={vitaminDProgress} goal={vitaminDIntake || 1} taskName="Vitamin D Intake" />
      <ProgressBar progress={proteinProgress} goal={proteinIntake || 1} taskName="Protein Intake" />
    </ScrollView>
  );
}