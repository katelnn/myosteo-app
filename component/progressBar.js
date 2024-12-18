import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainStyles from '../stylesheet/mainStyle';
import dashboardStyles from '../stylesheet/dashboardStyle';
import ExerciseIcon from '../assets/icons/exerciseIcon.svg';
import CalciumIcon from '../assets/icons/calciumIcon.svg';
import VitaminDIcon from '../assets/icons/vitaminDIcon.svg';
import ProteinIcon from '../assets/icons/proteinIcon.svg';

const ProgressBar = ({ progress = 0, goal = 1, taskName }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  // Ensure progress does not exceed goal and avoid division by zero
  const clampedProgress = Math.min(progress, goal);
  const progressPercentage = goal > 0 ? (clampedProgress / goal) * 100 : 0;

  // Determine colors based on progress
  const progressBarColor =
    progressPercentage > 50 ? '#92ED61' : progressPercentage >= 25 ? '#EACE40' : '#EA8740';
  const fullBarColor =
    progressPercentage > 50 ? '#92ED6120' : progressPercentage >= 25 ? '#EACE4020' : '#EA874020';

  // Screen width and bar width
  const screenWidth = Dimensions.get('window').width;
  const barWidth = screenWidth * 0.8;

  // Map taskName to appropriate icons and units
  const taskIcons = {
    Exercise: <ExerciseIcon width={24} height={24} marginLeft={5} />,
    'Calcium Intake': <CalciumIcon width={24} height={24} marginLeft={5} />,
    'Vitamin D Intake': <VitaminDIcon width={24} height={24} marginLeft={5} />,
    'Protein Intake': <ProteinIcon width={24} height={24} marginLeft={5} />,
  };

  const taskUnits = {
    Exercise: 'mins',
    'Calcium Intake': 'mg',
    'Vitamin D Intake': 'IU',
    'Protein Intake': 'g',
  };

  useEffect(() => {
    // Animate the progress bar width whenever the progress changes
    Animated.timing(animatedProgress, {
      toValue: progressPercentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage]);

  return (
    <View style={mainStyles.dailyContainer}>
      {/* Task Header */}
      <View style={dashboardStyles.taskHeader}>
        <Text style={mainStyles.metricHeader}>{taskName}</Text>
        <Text style={[mainStyles.accompanyText, dashboardStyles.taskProgress]}>
          {clampedProgress} / {goal} {taskUnits[taskName] || ''}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={mainStyles.iconAndBarContainer}>
        {/* Icon */}
        <View style={[mainStyles.iconContainer, dashboardStyles.taskIcon]}>
          {taskIcons[taskName]}
        </View>

        {/* Full Bar */}
        <View
          style={[
            mainStyles.fullBar,
            {
              backgroundColor: fullBarColor,
              width: barWidth,
            },
          ]}
        >
          {/* Animated Progress */}
          <Animated.View
            style={[
              mainStyles.progessBar,
              {
                width: animatedProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, barWidth], // Map percentage to bar width
                }),
                backgroundColor: progressBarColor,
              },
            ]}
          />
          {/* Completion Checkmark */}
          {clampedProgress >= goal && (
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="black"
              style={mainStyles.checkIcon}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
