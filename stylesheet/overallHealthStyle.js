import { StyleSheet } from 'react-native';

const overallHealthStyles = StyleSheet.create({

  boneHealthScoreHeading:{
    marginTop: 30,
    marginBottom: 10,
  },

  boneHealthScoreParagraph:{
    marginBottom: 75,
  },

  overallOverviewParagraph:{
    marginTop: 5,
    marginBottom: 80,
  },


  dailyTitle: {
    marginBottom: 10,
  },

  dailyCaption:{
    paddingTop: 10,
  },

  dailyTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dailyContainer:{
    marginBottom: 50,
  },
  
  resultNumber: {
    color: '#ffffff',
  },

  noStatus:{
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#001B6280',
    marginLeft: 25,
    marginBottom: 20,
    width: '80%',
    lineHeight: 35,
  }
});

export default overallHealthStyles;