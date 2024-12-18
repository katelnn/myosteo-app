import { Text, ScrollView, View, TouchableOpacity, TextInput, Image, Modal, StyleSheet, FlatList } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import mainStyles from '../../stylesheet/mainStyle';
import contactStyles from '../../stylesheet/contactStyle';
import React, { useState, useEffect } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; 
import * as Contacts from 'expo-contacts';


export default function AddContact({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [job, setJob] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);

  const [phoneContacts, setPhoneContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.photo) {
      setPhoto(route.params.photo.uri);
    }
  }, [route.params?.photo]);

  //This function creates a new contact with details and then save it to Firebase Firestore 
  const handleDonePress = async () => {
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      job: job,
      phone: phone,
      photo: photo,
    };
  
    try {
      console.log(db); // Check if db is correctly initialized
  
      // Correctly call the collection and add a document
      const docRef = await addDoc(collection(db, 'contacts'), newContact);
      console.log("Contact added with ID: ", docRef.id);
  
      // Navigate to Contact.js with new contact as a parameter
      navigation.navigate("Home", {
        screen: "Contact",
        params: { newContact },
      });
    } catch (e) {
      console.error("Error adding contact: ", e);
    }
  };

  //This function load device's contacts, fetches name and phone numbers
  const handleLoadPhoneContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setPhoneContacts(data);
        setModalVisible(true);
      } else {
        Alert.alert('No Contacts Found', 'There are no contacts to display.');
      }
    } else {
      Alert.alert('Permission Denied', 'Permission to access contacts denied.');
    }
  };

  //This function get the first name, last name, and phone number from the selected contact,
  const handleAddContact = (selectedContact) => {
    const [firstName, ...lastNameParts] = (selectedContact.name || "").split(" ");
    const lastName = lastNameParts.join(" ");
    const phone = selectedContact.phoneNumbers?.[0]?.number || "";
  
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(phone);
    setModalVisible(false);
  };

  return (
    <ScrollView style={[mainStyles.container]}>
       {photo ? (
          <Image
            source={{ uri: photo }}
            style={contactStyles.inputProfilePhoto}
          />
        ) : (
          <FontAwesome
            name="user-circle-o"
            size={100}
            color="#001B62"
            style={contactStyles.inputProfileIcon}
          />
        )}

       <View style={mainStyles.buttonContainer}>
            <TouchableOpacity style={mainStyles.button5} onPress={() => navigation.navigate('AddContactPhoto')}>
                <View style={mainStyles.buttonContent}>
                    <Text style={mainStyles.buttonText}>Add Photo</Text>
                    
                    <Entypo name="camera" size={24} color="white" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={mainStyles.button5} onPress={handleLoadPhoneContacts}>
               <Text style={mainStyles.buttonText}>Add Existing Contact</Text>
            </TouchableOpacity>
         </View>

         <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select a Contact to Add</Text>
            <FlatList
              data={phoneContacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.contactItem}>
                  <View style={styles.contactInfoContainer}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactInfo}>{item.phoneNumbers?.[0]?.number || 'No Phone'}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddContact(item)}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <View style={contactStyles.inputContactContainer}>
            <TextInput 
                style={mainStyles.input1}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}   
            />

            <TextInput 
                style={mainStyles.input1}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}   
            />

            <TextInput 
                style={mainStyles.input1}
                placeholder="Occupation"
                value={job}
                onChangeText={setJob}   
            />

            <TextInput 
                style={mainStyles.input1}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}   
            />
        </View>

        <View style={mainStyles.bottomButtonContainer}>
            <TouchableOpacity style={mainStyles.bottomButton} onPress={handleDonePress}>
                <View style={mainStyles.buttonContent}>
                    <Text style={mainStyles.buttonText3}>Done </Text>
                    <Feather name="arrow-right" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F2FF',
  },
  header: {
    fontSize: 30,
    marginTop: 100,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    color: '#001B62',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Poppins_500Medium',
    color: '#001B62',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#001B62',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  contactInfoContainer: {
    flexDirection: 'column',
    width: '75%',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: '#001B62',
    padding: 4,
    marginBottom: 10,
    fontFamily: 'Poppins_500Medium',
  },
  contactInfo: {
    fontSize: 16,
    color: '#001B62',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
  },
  contactPhone: {
    fontSize: 16,
    color: '#001B62',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
  },
  addButton: {
    padding: 8,
    backgroundColor: '#F0F2FF',
    borderRadius: 5,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#001B62',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#001B62',
    fontFamily: 'Poppins_500Medium',
  },
  button: {
    backgroundColor: '#001B62',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 50,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#F0F2FF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    color: '#001B62',
  },
});
