import { Camera, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';

import mainStyles from "../../stylesheet/mainStyle";
import healthPlanStyles from "../../stylesheet/healthPlanStyle";

import Bin from '../../assets/icons/bin.svg';

export default function App({navigation}) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [showBin, setShowBin] = useState(false); 

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

  //This function that sets up the settings for the photo and takes it
  const takePic = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setShowBin(true);
  };

  if (photo) {
    const savePhoto = () => {
      if (photo) {
        navigation.navigate("Nutrition1", { photo });
      }
    };
  
    return (
      <SafeAreaView style={styles.container2}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={healthPlanStyles.nutritionCameraEditContainer}>
          <TouchableOpacity style={[mainStyles.cameraButton3]} onPress={savePhoto}>
            <View style={[mainStyles.buttonContent]}>
              <Text style={mainStyles.buttonText}>Save Picture</Text>
            </View>
          </TouchableOpacity>
          {showBin && <Bin width={30} height={30} onPress={() => setPhoto(undefined)} />}
        </View>
      </SafeAreaView>
    );
  }
  
  //Screen that shows the camera along with buttons to take photos
  return (
    <CameraView ref={cameraRef}  style={styles.container}>
      <View style={healthPlanStyles.nutritionCameraEditContainer} >
        <TouchableOpacity style={[ mainStyles.cameraButton3]} onPress={takePic}>
          <View style={[mainStyles.buttonContent]}>
            <Text style={mainStyles.buttonText}>Add Picture</Text>
          </View>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '78%',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  container2: {
    width: '100%', 
    height: '78%',
    marginTop: 100,
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
    height: '100%',
    transform: [{ translateX: 0 }, { translateY: 70}]  }
});
