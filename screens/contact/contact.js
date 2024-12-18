import { Text, Image, ScrollView, View, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import contactStyles from '../../stylesheet/contactStyle';
import healthPlanStyles from '../../stylesheet/healthPlanStyle';
import mainStyles from '../../stylesheet/mainStyle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';  // Import Firestore instance
import { collection, getDocs, addDoc } from 'firebase/firestore';  // Firestore functions for fetching data
import Svg, { Path } from 'react-native-svg';
import * as Contacts from 'expo-contacts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Linking } from 'react-native';

export function SimpleIconsReact(props) {
	return (<Svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" {...props}><Path fill="currentColor" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236a2.236 2.236 0 0 1-2.236-2.236a2.236 2.236 0 0 1 2.235-2.236a2.236 2.236 0 0 1 2.236 2.236m2.648-10.69c-1.346 0-3.107.96-4.888 2.622c-1.78-1.653-3.542-2.602-4.887-2.602c-.41 0-.783.093-1.106.278c-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03c-.704 3.113-.39 5.588.988 6.38c.32.187.69.275 1.102.275c1.345 0 3.107-.96 4.888-2.624c1.78 1.654 3.542 2.603 4.887 2.603c.41 0 .783-.09 1.106-.275c1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032c.704-3.11.39-5.587-.988-6.38a2.17 2.17 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127c.666.382.955 1.835.73 3.704c-.054.46-.142.945-.25 1.44a23.5 23.5 0 0 0-3.107-.534A24 24 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28c-.686.72-1.37 1.537-2.02 2.442a23 23 0 0 0-3.113.538a15 15 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707c.19-.09.4-.127.563-.132zm4.882 3.05q.684.704 1.36 1.564c-.44-.02-.89-.034-1.345-.034q-.691-.001-1.36.034c.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093q.61.874 1.183 1.86q.557.961 1.018 1.946c-.308.655-.646 1.31-1.013 1.95c-.38.66-.773 1.288-1.18 1.87a25.6 25.6 0 0 1-4.412.005a27 27 0 0 1-1.183-1.86q-.557-.961-1.018-1.946a25 25 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25 25 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16q-.336.585-.635 1.174c-.265-.656-.49-1.31-.676-1.947c.64-.15 1.315-.283 2.015-.386zm7.26 0q1.044.153 2.006.387c-.18.632-.405 1.282-.66 1.933a26 26 0 0 0-1.345-2.32zm3.063.675q.727.226 1.375.498c1.732.74 2.852 1.708 2.852 2.476c-.005.768-1.125 1.74-2.857 2.475c-.42.18-.88.342-1.355.493a24 24 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23 23 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5c-1.732-.737-2.852-1.706-2.852-2.474s1.12-1.742 2.852-2.476c.42-.18.88-.342 1.356-.494m11.678 4.28c.265.657.49 1.312.676 1.948c-.64.157-1.316.29-2.016.39a26 26 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175q.345.586.705 1.143a22 22 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423c.23 1.868-.054 3.32-.714 3.708c-.147.09-.338.128-.563.128c-1.012 0-2.514-.807-4.11-2.28c.686-.72 1.37-1.536 2.02-2.44c1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532c.66.905 1.345 1.727 2.035 2.446c-1.595 1.483-3.092 2.295-4.11 2.295a1.2 1.2 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703c.054-.46.142-.944.25-1.438zm4.56.64q.661.032 1.345.034q.691.001 1.36-.034c-.44.572-.895 1.095-1.345 1.565q-.684-.706-1.36-1.565"></Path></Svg>);
}


export default function Contact() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  

  const navigation = useNavigation();
  const route = useRoute();
  const [contacts, setContacts] = useState([]); // State to hold the list of contacts
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editListModalVisible, setEditListModalVisible] = useState(false);

  useEffect(() => {
    //This function fetch contacts from Firestore when the component mounts
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const fetchedContacts = querySnapshot.docs.map(doc => doc.data());
        setContacts(fetchedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();

    // Check if a new contact is passed through route parameters
    if (route.params?.newContact) {
      setContacts((prevContacts) => [...prevContacts, route.params.newContact]);
    }
  }, [route.params?.newContact]);

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
  const handleAddContact = async (contact) => {
    const [firstName, ...lastNameParts] = (contact.name || "").split(" ");
    const lastName = lastNameParts.join(" ");
    const phone = contact.phoneNumbers?.[0]?.number || "";
  
    // Check for duplicates
    const isDuplicate = selectedContacts.some(
      (c) => c.phone === phone && c.firstName === firstName
    );
  
    if (!isDuplicate) {
      // Add to local state
      const newContact = { firstName, lastName, phone };
      setSelectedContacts((prevContacts) => [...prevContacts, newContact]);
  
      // Save to Firestore
      try {
        await addDoc(collection(db, 'contacts'), newContact);
        console.log("Contact successfully saved to Firestore!");
      } catch (error) {
        console.error("Error saving contact to Firestore:", error);
      }
    } else {
      Alert.alert("Duplicate Contact", "This contact is already added.");
    }
  
    setModalVisible(false); // Close the modal
  };

  const handleRemoveContact = (index) => {
    setSelectedContacts((prevContacts) =>
      prevContacts.filter((_, i) => i !== index)
    );
  };
  
  const handleSaveChanges = () => {
    setEditListModalVisible(false); // Close the modal
  };

  const handleCallContact = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("No Phone Number", "This contact does not have a valid phone number.");
      return;
    }
  
    const url = `tel:${phoneNumber.trim()}`; // Ensure no whitespace in the number
    Linking.openURL(url).catch((err) => {
      console.error("Error making call", err);
      Alert.alert("Error", "Failed to make a call.");
    });
  };

  return (
    <ScrollView style={[mainStyles.container]}>
      <Image
        source={require("../../assets/icons/contactIcon2.png")}
        style={mainStyles.heroIcon2}
      />
      <Text style={mainStyles.heading1}>Emergency Contacts</Text>
      <Text style={[mainStyles.paragraph, contactStyles.overallOverviewParagraph]}>
        List of essential emergency contacts to assist you during critical situations.
      </Text>

      <View style={mainStyles.buttonContainer2}>
          <TouchableOpacity style={mainStyles.button6} onPress={handleLoadPhoneContacts}>
              <Text style={mainStyles.buttonText}>Add Existing Contact</Text>
          </TouchableOpacity>
      </View>

      <View style={healthPlanStyles.nutritionHeaderRow2}>
        <Text style={healthPlanStyles.nutritionHeaderTitle}>Contact List</Text>
        <TouchableOpacity
          style={healthPlanStyles.nutritionAddButton}
          onPress={() => setEditListModalVisible(true)}
        >
          <Text style={healthPlanStyles.nutritionAddButtonText}>Edit List</Text>
        </TouchableOpacity>
      </View>

      <View style={contactStyles.personContainer}>
      <Text style={contactStyles.contactPersonName}>
        Emergency
      </Text>
      <Text style={contactStyles.contactPersonJob}>
         911
      </Text>
      <FontAwesome name="phone" size={32} color="#84DD54" />
    </View>
    <Text style={contactStyles.emergencyInformation}>
      For emergencies requiring police, fire, or ambulance services.
      </Text>

    <View style={contactStyles.personContainer}>
      <Text style={contactStyles.contactPersonName}>
        Healthlink BC
      </Text>
      <Text style={contactStyles.contactPersonJob}>
         811
      </Text>
      <FontAwesome name="phone" size={32} color="#84DD54" />
    </View>
    <Text style={contactStyles.emergencyInformation}>
      For non-emergency health advice and assistance.
    </Text>

    

      {selectedContacts.length > 0 ? (
  selectedContacts.map((contact, index) => (
    <View key={index} style={contactStyles.personContainer}>
      <Text style={contactStyles.contactPersonName}>
        {contact.firstName} 
      </Text>
      <Text style={contactStyles.contactPersonJob}>
        {contact.phone}
      </Text>
      
      <TouchableOpacity onPress={() => handleCallContact(contact.phone)}>
        <FontAwesome name="phone" size={32} color="#84DD54" />
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text style={[mainStyles.paragraph, contactStyles.noContactStatus]}>
  </Text>
)}

      

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
                  <Text style={contactStyles.contactPersonName}>
        {item.firstName} 
      </Text>
      <Text style={styles.contactPhone}>
        {item.phoneNumbers?.[0]?.number || 'No Phone'}
      </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddContact(item)}
                  >
                     <FontAwesome6 name="plus" size={24} color="black" />
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

      <Modal
        visible={editListModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditListModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.editModalContainer}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Contact List</Text>
              <TouchableOpacity onPress={() => setEditListModalVisible(false)}>
                <FontAwesome name="close" size={24} color="#001B62" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={selectedContacts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.contactItem}>
                  <Text style={styles.contactName}>
                    {item.firstName}    {item.phone}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveContact(index)}>
                    <FontAwesome name="trash" size={24} color="#FF5A5A" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text></Text>
      <Text></Text>
      <Text></Text>


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
    height: 100,
  },
  contactInfoContainer: {
    flexDirection: 'row',
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
    fontSize: 14,
    color: '#001B62',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 11,
    marginLeft: 12,
  },
  addButton: {
    padding: 8,
    backgroundColor: '#F0F2FF',
    borderRadius: 5,
    alignSelf: 'flex-end',
    borderColor: '#001B62',
    marginBottom: 20,
    backgroundColor: "#C0C7E0",
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

  editModalContainer: {
    width: "90%",
    backgroundColor: "#F0F2FF",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: "#001B62",
    fontFamily: "Poppins_500Medium",
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F2FF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  contactName: {
    fontSize: 16,
    color: "#001B62",
    fontFamily: "Poppins_500Medium",
  },
  saveButton: {
    backgroundColor: "#001B62",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 70,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
});
