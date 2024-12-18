import { StyleSheet } from 'react-native';

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    height: 120,  
    backgroundColor: '#001B62', 
  },
  icon: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 30,
    height: 30,     
    marginTop: 20,
  },

  label: {
    fontSize: 14,             
    fontFamily: 'Poppins_500Medium',
    color: '#ffffff',            
    marginTop: 15,
    paddingRight:1,
    paddingTop: 5,
  },

  
});