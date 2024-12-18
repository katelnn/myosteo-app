import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import dashboardStyles from '../stylesheet/dashboardStyle';

//This function creates a notification message when user select their current emotion and their body parts that are in pain
const Notification = ({ 
  isVisible, 
  messageType, 
  selectedItem, 
  items, 
  closeHandler, 
  toggleHandler, 
  dontShowAgain, 
}) => {
  if (!isVisible || dontShowAgain) return null;

  const selectedLabels =
    messageType === 'pain'
      ? selectedItem.map((itemName) => items.find((item) => item.name === itemName)?.label).filter(Boolean).join(', ')
      : items.find((item) => item.name === selectedItem)?.label;

  return (
    <View style={dashboardStyles.notificationContainer}>
      <Text style={messageType === 'pain' ? dashboardStyles.selectedPainMessage : dashboardStyles.selectedEmojiMessage}>
        {messageType === 'pain' ? `Pain Areas Selected: ${selectedLabels}` : `Feeling Selected: ${selectedLabels}`}
      </Text>
      <Text style={dashboardStyles.notificationText}>
        Please note that all entries will be saved at the end of the day and will be recorded to your health summary.
      </Text>
      <TouchableOpacity onPress={closeHandler} style={dashboardStyles.closeButton}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={dashboardStyles.dontShowAgainContainer}>
        <TouchableOpacity onPress={toggleHandler} style={dashboardStyles.checkbox}>
          {dontShowAgain && <View style={dashboardStyles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={dashboardStyles.dontShowAgainText}>Don’t show me again</Text>
      </View>
    </View>
  );
};

export default Notification;