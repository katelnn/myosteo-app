import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import mainStyles from '../../stylesheet/mainStyle';
import healthPlanStyles from '../../stylesheet/healthPlanStyle';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function Outdoor3() {
  const navigation = useNavigation(); 
  const route = useRoute();

  const exerciseTime = route.params?.exerciseTime || 0;
  
  // Destructure the location and randomLocation passed from Outdoor2
  const { location, randomLocation } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    //Set the location after the locations are swapped
    setCurrentLocation({
      latitude: randomLocation.latitude,
      longitude: randomLocation.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });
  }, [randomLocation]);

  //This function swap locations and pass them to Outdoor3
  const handleNavigateToOutdoor4 = () => {
    navigation.navigate('Outdoor4', {
      location: randomLocation,  
      randomLocation: location,  
      exerciseTime
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
            source={require('../../assets/images/outdoor.png')} 
            style={mainStyles.topImage}
      />
      <View style={mainStyles.buttonContainer}>
        <TouchableOpacity style={mainStyles.backButton} onPress={() => navigation.navigate('Outdoor2')}>
          <View style={mainStyles.buttonContent}>
            <AntDesign name="arrowleft" size={24} color="#7887B0" />
            <Text style={mainStyles.backButtonText}>Back </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={healthPlanStyles.outdoorContainer}>
        <View style={healthPlanStyles.outdoorTopContainer}>
          <Text style={[mainStyles.heading1, healthPlanStyles.date]}>Outdoor Walk</Text>
          <Text style={mainStyles.heading3}> {exerciseTime} mins </Text>
        </View>
        <Text style={mainStyles.paragraph}>
          Great job in reaching the destination. Now you should take a break and go back to the place you started
        </Text>
      </View>

      {currentLocation ? (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={healthPlanStyles.map}
          region={currentLocation} // Use the current location state for the map region
          showsMyLocationButton
          showsUserLocation
        >
          {/* Swapped Current Location Marker */}
          <Marker coordinate={randomLocation} title="Flag Location">
            <Ionicons
              name="flag-sharp" 
              size={30}
              color="red" 
            />
          </Marker>

          {/* Swapped Flag Marker */}
          <Marker coordinate={location} title="You are here">
            <Ionicons
              name="person-circle" 
              size={30}
              color="blue" 
            />
          </Marker>
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity style={mainStyles.disableBottomButton2} onPress={handleNavigateToOutdoor4}>
        <Text style={[mainStyles.buttonText3]}>Finish Exercise</Text>
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
