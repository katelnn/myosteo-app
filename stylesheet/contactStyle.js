import { StyleSheet } from 'react-native';

const contactStyles = StyleSheet.create({
    overallOverviewParagraph:{
        marginTop: 10,
        marginBottom: 70,
    },
    
    personContainer: {
        marginTop: 30,
        width: '95%',
    },

   contactPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    paddingTop: 20,
    marginBottom: -20,
  },
  contactDetailsContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1, 
  },
  contactPersonName: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#21325E',

  },
  contactPersonJob: {
    fontSize: 14,
    color: '#7A8398',
    marginTop: -5,
  },

  /*---------------------Add Contact -----------------------------*/
  inputContactContainer:{
    marginTop: 50,
  },

  inputProfileIcon:{
    textAlign: 'center', // This will center the icon inside the container
    marginTop: 10,
    marginBottom: 10,
  },

  noContactStatus:{
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
    color: '#001B6280',
    marginLeft: -10,
  },

  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#C0C7E0",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '90%',
    zIndex: 1,
    backgroundColor: '#F0F2FF',
  },
  contactDetailsContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  contactPersonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#001B62",
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
    marginLeft: -10
  },

  emergencyInformation:{
    backgroundColor: '#D5DBF2',
    width: '90%',
    marginTop: -15,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    paddingBottom: 20,
    fontSize: 16,
    marginBottom: 10,
  },

});

export default contactStyles;