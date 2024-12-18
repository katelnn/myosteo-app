import { Camera, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';

import mainStyles from "../../stylesheet/mainStyle";
import healthPlanStyles from "../../stylesheet/healthPlanStyle";

import Entypo from "@expo/vector-icons/Entypo";

export default function App({navigation}) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  //This function asks for permission the moment the app is opened
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  //States that run based on if the app is awaiting permissions or has been rejected
  if (hasCameraPermission === undefined) {
    return <Text>Awaiting permissions</Text>
  } else if (!hasCameraPermission) {
    return <Text>Failed to get permissions, change this in settings</Text>
  }
  
  //This function sets up the settings for the photo and takes it
  const takePic = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const savePhoto = () => {
      if (photo) {
        navigation.navigate("AddContact", { photo: { uri: photo.uri } });
      }
    };

    return (
      <SafeAreaView style={healthPlanStyles.previewContainer}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <TouchableOpacity style={[mainStyles.cameraButton, healthPlanStyles.editButton]} onPress={savePhoto}>
          <View style={mainStyles.buttonContainer}>
            <Text style={mainStyles.buttonText}>Add to contact profile</Text>  
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyles.cameraButton, healthPlanStyles.editButton]} onPress={() => setPhoto(undefined)}>
              <View style={mainStyles.buttonContainer}>
                <Text style={mainStyles.buttonText}>Delete photo</Text>  
              </View>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  //Screen that shows the camera along with buttons to take photos
  return (
    <CameraView ref={cameraRef}  style={styles.container}>
      <View>
        <TouchableOpacity style={[ mainStyles.cameraButton, {transform: [{ translateX: 0}, { translateY: 100}]}]} onPress={takePic}>
          <View style={[mainStyles.buttonContent]}>
            <Text style={mainStyles.buttonText}>Take Photo</Text>
            <Entypo name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '75%',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  buttonContainer: {
    color: "white",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    padding: 20,
    margin: 10,
  },
  preview: {
    width: '100%', 
    height: '85%',
    transform: [{ translateX: 0 }, { translateY: -25}]  }
});
