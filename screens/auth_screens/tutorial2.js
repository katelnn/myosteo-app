import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { tutorialStyle, createAccountStyle } from '../../stylesheet/authenticationStyles';
import { homeStyle } from '../../stylesheet/authenticationStyles';
import { Ionicons } from '@expo/vector-icons';

import Illustration from '../../assets/illustrations/tutorial2.svg';

export default function Tutorial1({ navigation }) {

  return (

    <View style={tutorialStyle.container}>
      <TouchableOpacity style={createAccountStyle.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="#001B62" />
      </TouchableOpacity>

      <Illustration width={250} height={250} marginTop={350}></Illustration>
      <Text style={tutorialStyle.title}>Track Nutrients in Every Meal</Text>
      <Text style={tutorialStyle.paragraph}>
      Easily evaluate your meals for key nutrients like calcium, protein, and vitamin D. 
      </Text>

      <View style={tutorialStyle.indicatorContainer}>
          <View style={tutorialStyle.indicator} />
          <View style={tutorialStyle.indicator} />
          <View style={[tutorialStyle.indicator, tutorialStyle.activeIndicator]} />
          <View style={tutorialStyle.indicator} />
        </View>
      <View style={homeStyle.buttonContainer}>
        <TouchableOpacity 
          style={homeStyle.button} 
          onPress={() => navigation.navigate('Tutorial3')}
        >
          <Text style={homeStyle.buttonText}>Next</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={homeStyle.button2} 
          onPress={() => navigation.navigate('Home', { screen: 'Dashboard' })}
        >
          <Text style={homeStyle.buttonText3}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
