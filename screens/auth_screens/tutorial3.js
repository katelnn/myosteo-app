import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { tutorialStyle } from '../../stylesheet/authenticationStyles';
import { homeStyle } from '../../stylesheet/authenticationStyles';
import { Ionicons } from '@expo/vector-icons';

import Illustration from '../../assets/illustrations/tutorial3.svg';

export default function Tutorial1({ navigation }) {

  return (

    <View style={tutorialStyle.container}>
      <TouchableOpacity style={tutorialStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#001B62" />
      </TouchableOpacity>

      <Illustration width={250} height={250} marginTop={350}></Illustration>
      <Text style={tutorialStyle.title}>Monitor Your Daily Progress</Text>
      <Text style={tutorialStyle.paragraph}>
      Track your exercise and nutrition progress {'\n'}with personalized health metrics. 
      </Text>

      <View style={tutorialStyle.indicatorContainer}>
          <View style={tutorialStyle.indicator} />
          <View style={tutorialStyle.indicator} />
          <View style={tutorialStyle.indicator} />
          <View style={[tutorialStyle.indicator, tutorialStyle.activeIndicator]} />
        </View>
      <View style={homeStyle.buttonContainer}>
        <TouchableOpacity 
          style={homeStyle.button} 
          onPress={() => navigation.navigate('Home', { screen: 'Dashboard' })}
        >
          <Text style={homeStyle.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
