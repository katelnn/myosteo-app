import { StyleSheet } from 'react-native';

const dashBoardStyles = StyleSheet.create({

  /*-------------------------------Profile Container ---------------------------------------*/
  profileContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },

  profileInfoContainer: {
    transform: [{ translateX: 20 }, { translateY: 55}]
  },

  editContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },

  editIcon: {
    marginLeft: 10,
  },

  separatorLine: {
    height: 1, // Height of the line
    backgroundColor: '#D5DBF2', // Line color
    marginVertical: 20, // Margin to add space around the line
    width: '100%', // Make the line span the full width
  },

  /*----------------------------------Popup ---------------------------------------------*/
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },

  modalTextCountdown:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#333',
    marginLeft: -25,
    marginTop: -5,
  },

  /*--------------------------------Daily Log Button ----------------------------*/
  dailyLogButton:{
    marginTop: 40,
    marginBottom: 40,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  /*-------------------------------Dashboard Overview Container ---------------------------------------*/
  dashboardContainer: {
    marginTop: 30,
  },

  dashboardHeadingContainer: {
    flexDirection: 'row',
  },

  infoIcon: {
    marginLeft: 10,
  },

  date: {
    marginTop: 5,
    marginBottom: 10,
  },

  metricHeading: {
    marginTop: 30,
    marginBottom: 10,
  },

  /*-------------------------------Daily Task Container ---------------------------------------*/
  taskHeader: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 10, 
  },

  taskProgress: {
    marginLeft: 10, 
  },

  viewLogs: {
    marginLeft: 10,
  },

  fullBar2: {
    position: 'absolute',
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EA874080',
  },

  progessBar2: {
    position: 'absolute',
    width: '0%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EA8740',
    opacity: '100%',
  },

  fullBar3: {
    position: 'absolute',
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#92ED61',
  },

  progessBar3: {
    position: 'absolute',
    width: '95%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#92ED61',
    opacity: '100%',
  },

  taskIcon:{
    width: 50,
    height: 50,
  },

  /*-------------------------------Feeling and Emotion Container ---------------------------------*/
  feelingContainer: {
    marginTop: 57,
  },


  feelingParagraph: {
    marginTop: 10,
    marginBottom: 30,
  },

  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: -15,
    paddingLeft: 25,
    paddingRight: 25,
  },

  singleEmojiContainer: {
    width: 100,
    marginBottom: 60,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#D5DBF2',
    marginHorizontal: 10,
    borderRadius: 10,
     // Shadow for iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.5,
    // Shadow for Android
    elevation: 5, // Adds shadow-like effect
  },

  emojiLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#7887B0',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10,
  },

  selectedEmoji: {
    backgroundColor: '#F0F2FF', 
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, 
  },

  selectedEmojiText:{
    color: '#001B62',
  },

   /*------------------------------Pain Container ---------------------------------------*/
   painContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: -2,
    paddingLeft: 10,
    paddingRight: 25,
  },
  painSelectionContainer: {
    marginHorizontal: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120, 
    borderRadius: 10,
    transform: [{ translateX: -12 }, { translateY: 0}],
    backgroundColor: '#D5DBF2',
    marginBottom: 50,
    // Shadow for iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    // Shadow for Android
    elevation: 5, 
  },
  
  painLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, 
    color: '#7887B0',
    fontFamily: 'Poppins_600SemiBold',
  },
  selectedPain: {
    opacity: 0.8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },

  selectedPainText:{
    color: '#001B62',
  },

  /*-------------------------------Notification Container ---------------------------------------*/
  // New styles for notification message box

  selectedEmojiMessage:{
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },

  selectedPainMessage:{
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },

  notificationContainer: {
    backgroundColor: '#F0F0F0', // Light grey background
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    position: 'relative',
    marginTop: -40,
    marginBottom: 30,
    
  },
  notificationText: {
    color: '#333',
    fontSize: 12,
    marginBottom: 8,
  },

  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  dontShowAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#888', 
  },
  dontShowAgainText: {
    color: '#666',
    fontSize: 12,
  },

  /*-------------------------------Setting Container ---------------------------------------*/
  settingProfileContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 20, 
  },

  profileIconWrapper: {
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#F4F6FA', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#001B62', 
  },

  settingHeroIcon: {
    width: 50, 
    height: 50, 
    tintColor: '#001B62',
  },


});

export default dashBoardStyles;
