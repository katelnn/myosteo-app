import { StyleSheet } from 'react-native';

const healthPlanStyles = StyleSheet.create({

  overallPlanParagraph:{
    marginTop: 20,
    marginBottom: 60,
  },

  overallNoteParagraph:{
    marginTop: 20,
    marginBottom: 60,
  },

  exerciseContainer: {
    backgroundColor: '#001B6220',
    paddingLeft: 15,
    paddingTop: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '95%',
  },

  exerciseSubContainer:{
    width: '100%',
  },

  exerciseImage: {
    width: '95%',
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },

  exerciseType: {
    color: "#001B62",
    backgroundColor: "#001B6220",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    fontSize: 14,
    marginTop: 10,
  },

  indoorExerciseContainer:{
    marginLeft: 30,
    marginTop: 20,
  },

  indoorExerciseTypeContainer:{
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },

  indoorExerciseTag:{
     flexDirection: 'row',
     gap: 30,
     alignItems: 'center',
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
    transform: [{ translateX: 0 }, { translateY: 3}]
  },

  durationContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
    marginBottom: 10,
    transform: [{ translateX: 0 }, { translateY: 3}]
  },

  exercisePreviewText:{
    marginTop: 80,
  },

  indoorExercisePreviewContainer: {
    flexDirection: 'row', 
    backgroundColor: '#F0F2FF', 
    borderRadius: 10, 
    padding: 10, 
    marginVertical: 12,
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    paddingTop: 10,
    paddingBottom: 10,
  },
  indoorExercisePreviewImage: {
    width: 120,
    height: 80, 
    borderRadius: 10, 
    marginRight: 15, 
  },
  indoorExercisePreviewInfo: {
    flex: 1, 
    marginTop: 15,
  },

  indoorGifContainer: {
    backgroundColor: '#F0F2FF',
    padding: 15,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '85%',
  },
  instructionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001B62',
    marginBottom: 10,
  },
  exerciseGif: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', 
    borderRadius: 10,
  },
  indoorInstructionContainer: {
    backgroundColor: '#F0F2FF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    width: '85%',
  },

  outdoorInstructionContainer: {
    backgroundColor: '#F0F2FF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    width: '100%',
  },

  instructionTitle2: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#001B62',
    marginBottom: 5,
  },

  instructionTitle3: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#001B62',
    marginBottom: 5,
    marginTop: 8,
  },

  instructionText: {
    fontSize: 14,
    color: '#001B62', 
    lineHeight: 20,
  },

  instructionText2:{
    fontSize: 14,
    color: '#001B62',
    lineHeight: 20,
    marginBottom: 10,
  },

  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001B62', 
  },
  
  viewMoreContainer:{
    flexDirection: 'column', // Stack elements vertically if needed
    alignItems: 'center', // Center child elements horizontally
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    marginBottom: 15,
    width: '95%',
    marginTop: 5,
  },

  healthTitle:{
    marginTop: 80,
  },

  prescriptionContainer:{
    marginTop: 80,
    width: '95%',
  },

  prescriptionHeadingContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },

  prescriptionNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2FF', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    width: '92%',
    paddingTop: 20,
    paddingBottom: 30,
  },

  noteTextContainer: {
    flex: 1, 
    paddingRight: 10, 
  },
  noteTitle: {
    fontSize: 20, 
    marginBottom: 10,
    fontFamily: 'Poppins_500Medium', 
    color: '#001B62',
    marginLeft: 10,
  },

  noteSubtitle: {
    fontSize: 16, 
    marginBottom: 4,
  },

  noteInstructions: {
    fontSize: 14,
    color: '#001B62',
    marginLeft: 10,
    marginBottom: -20,
  },

  imageContainer: {
    width: 100,
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteImage: {
    width: '100%',
    height: '100%', 
    resizeMode: 'contain', 
  },

  noMedication:{
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
    color: '#001B6280',
    marginLeft: -10,
    marginBottom: 50,
  },

  editButton:{
    textAlign: 'center',   
    marginBottom: 20, 
  },

  previewContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addMedicationIcon:{
    marginLeft: 15,
  },

  learnExerciseButton:{
    transform: [{ translateX: 210 }, { translateY: 25}],
    height: 40,
    width: 125,
    position: 'absolute'
  },

  /*-----------------------Sub-Section: Outdoor -------------------------*/
  outdoorContainer:{
    width: '95%',
    flex: 1,
  },

  outdoorTopContainer: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },

  exerciseStatusContainer:{
    marginTop: 30,
    marginLeft: 10,
  },

  exerciseStatusText:{
    marginRight: 10
  },

  instructionContainer:{
    marginTop: 50,
  },

  instructionTitle:{
    marginBottom: 10,
  },

  postureContainer:{
    marginTop: 50,
  },



  /*-----------------------Sub-Section: Weather -------------------------*/

  weatherStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2FF',
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  weatherIcon: {
    marginRight: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  weatherInformationContainer: {
    flex: 1,
  },
  weatherTopInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  weatherContentContainer:{
      backgroundColor: '#001B62',
      width: '60%',
      textAlign: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },

  typeofWeatherText:{
    marginTop: 10,
    marginBottom: 10,
  },


    /*-----------------------Sub-Section: Map -------------------------*/

    map:{
      width: '100%',
      height: 400,
      transform: [{ translateX: 0 }, { translateY: -130}]
    },


    /*-----------------------Sub-Section: Congratulation -------------------------*/
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },

    modalContainer2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      height: 800,
    },

    modalContent: {
      width: "90%",
      backgroundColor: "#F0F2FF",
      padding: 20,
      borderRadius: 20,
      alignItems: "center",
    },

    modalButton: {
      backgroundColor: "#001B62", // Dark blue button color
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: '20%',
      marginBottom: 15,
    },

    modalButton2: {
      backgroundColor: "#001B62", // Dark blue button color
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: '20%',
      marginBottom: 15,
      width: '110%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 65,
    },

    modalMassage: {
      textAlign: "center",
      marginTop: 10,
      marginBottom: 30,

    },

   /*-----------------------Sub-Section: Nutrition -------------------------*/

   nutritionIntakeTitle:{
    marginTop: 100,
    marginLeft: 30,
    marginBottom: 40,
   },
   nutritionContainer: {
      backgroundColor: "#F0F2FF",
      padding: 20,
      borderRadius: 10,
      marginTop: 90,
    },
    nutritionHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      width: '90%',
    },

    nutritionHeaderRow2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      width: '90%',
      marginTop: -50,
    },

    nutritionHeaderTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#001B62", // Dark blue color for text
    },
    nutritionAddButton: {
      backgroundColor: "#001B62", // Dark blue button color
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    nutritionAddButtonText: {
      fontSize: 14,
      color: "#FFFFFF", // White text for button
      fontWeight: "bold",
    },
    nutritionSubText: {
      fontSize: 14,
      color: "#001B62", // Grayish-blue for subtext
      marginTop: 5,
    },

    nutritionCameraEditContainer: {
      flexDirection: 'row',
      justifyContent: 'center', // Centers children vertically
      alignItems: 'center',     // Centers children horizontally
      transform: [{ translateX: 0 }, { translateY: -30 }],
      gap: 30,
    },

    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '50%',
      borderRadius: 10,
      marginVertical: 15,
      padding: 5,
      marginLeft: -140,
      transform: [{ translateX: 0 }, { translateY: -15}],
    },

    quantityIcon:{
      backgroundColor: '#C0C7E0',
      alignItems: 'center',
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      width: 60,
      borderRadius: 10,
    },

    nutritionModalHeading:{
      marginLeft: -160,
    },

    closeIcon: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },

    closeIcon2: {
      alignSelf: 'flex-end',
      marginBottom: 10,
      transform: [{ translateX: -35 }, { translateY: 55}],
      zIndex: 100,
    },

    foodItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F0F2FF', 
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2, 
      width: '90%',
      height: 60,
      marginTop: 10,
      marginBottom: 20,
    },
    foodItemTextContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    foodName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#001858', 
    },
    foodServings: {
      fontSize: 14,
      fontWeight: '400',
      color: '#001858', 
      marginRight: 10,
    },
    deleteIcon: {
      color: '#FF4C4C', 
      marginLeft: 15,
    },

    nutritionCardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F0F2FF', 
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1.5,
      elevation: 2, 
      width: '88%',
    },
    nutritionIconAndLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nutritionIconContainer: {
      backgroundColor: '#001858', 
      borderRadius: 50, 
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    nutritionLabelText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#001858', // Navy blue for label text
    },
    nutritionValueText: {
      fontSize: 16,
      color: '#001858', // Navy blue for value text
    },

    nutrientResultHeading:{
      marginTop: 80,
      marginBottom: 10,
      fontFamily: 'Poppins_500Medium',
    },

});

export default healthPlanStyles;