import * as Location from "expo-location";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mainStyles from "../../stylesheet/mainStyle";
import healthPlanStyles from "../../stylesheet/healthPlanStyle";
import MapViewDirections from "react-native-maps-directions";
import LottieView from "lottie-react-native";

const GOOGLE_MAPS_APIKEY = "AIzaSyD3yNFsli2CJ_QXQK2E0R0HdQbHVEBeZqY";

export default function Outdoor2() {
  const [location, setLocation] = useState(null); // User's current location
  const [randomLocation, setRandomLocation] = useState(null); // Flag's random location
  const [errorMsg, setErrorMsg] = useState(null);
  const [path, setPath] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const animation = useRef(null);
  const exerciseTime = 15;

  const navigation = useNavigation();

  let lastLocation = null;

  useEffect(() => {
    let locationSubscription;

    const trackLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const initialLocation = await Location.getCurrentPositionAsync({});
        if (initialLocation) {
          const { latitude, longitude } = initialLocation.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          });
          generateRandomLocation(initialLocation.coords);

          // Start watching location changes
          locationSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 3000, // Update every 3 seconds
              distanceInterval: 10, // Update every 10 meters
            },
            (newLocation) => {
              const { latitude, longitude } = newLocation.coords;
              if (!lastLocation || 
                  Math.abs(latitude - lastLocation.latitude) > 0.0001 || 
                  Math.abs(longitude - lastLocation.longitude) > 0.0001) {
                setLocation({
                  latitude,
                  longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                });
                lastLocation = { latitude, longitude };
              }
            }
          );
        } else {
          setErrorMsg("Current location not obtained");
        }
      } catch (error) {
        console.error("Error tracking location:", error);
      }
    };

    trackLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const generateRandomLocation = (coords) => {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = 500;

    const latOffset = randomDistance / 111320;
    const lonOffset = randomDistance / (111320 * Math.cos(coords.latitude * (Math.PI / 180)));

    const randomLat = coords.latitude + latOffset * Math.sin(randomAngle);
    const randomLon = coords.longitude + lonOffset * Math.cos(randomAngle);

    setRandomLocation({
      latitude: randomLat,
      longitude: randomLon,
    });
  };

  const saveExerciseData = async () => {
    try {
      const activity = {
        type: "Outdoor Walking",
        time: "15 mins",
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

  const handleNextPress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/outdoor.png")}
        style={mainStyles.topImage}
      />
      <View style={mainStyles.buttonContainer}>
        <TouchableOpacity style={mainStyles.backButton} onPress={() => navigation.navigate("Outdoor1")}>
          <View style={mainStyles.buttonContent}>
            <AntDesign name="arrowleft" size={24} color="#7887B0" />
            <Text style={mainStyles.backButtonText}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={healthPlanStyles.outdoorContainer}>
        <View style={healthPlanStyles.outdoorTopContainer}>
          <Text style={[mainStyles.heading1, healthPlanStyles.date]}>Outdoor Walk</Text>
          <Text style={mainStyles.heading3}> {exerciseTime} mins </Text>
        </View>
        <Text style={mainStyles.paragraph}>
          Track your location while walking outdoors and get personalized route suggestions for your exercise.
        </Text>
      </View>

      {location && randomLocation ? (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={healthPlanStyles.map}
          region={location}
          showsMyLocationButton
          showsUserLocation
        >
          <Marker coordinate={location} title="You are here" />
          <Marker coordinate={randomLocation} title="Flag Location">
            <Ionicons name="flag-sharp" size={30} color="red" />
          </Marker>
          <MapViewDirections
            origin={location}
            destination={randomLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
            onReady={(result) => setPath(result.coordinates)}
            onError={(errorMessage) => console.error("Directions Error:", errorMessage)}
          />
          {path.length > 0 && <Polyline coordinates={path} strokeWidth={4} strokeColor="blue" />}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

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
              style={{ width: 100, height: 100 }}
              source={require('../../assets/Tick Animation.json')}
            />
            <Text style={mainStyles.heading3}>Congratulations!</Text>
            <Text style={[mainStyles.paragraph, healthPlanStyles.modalMassage]}>
              You’ve completed the outdoor walking exercise. Your activity has been tracked and recorded for today.
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

      <TouchableOpacity style={mainStyles.bottomButton3} onPress={handleNextPress}>
        <View style={mainStyles.buttonContent}>
          <Text style={[mainStyles.buttonText3, healthPlanStyles.exerciseStatusText]}>Finish Exercise</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
