import { StyleSheet } from 'react-native';

//------ stylesheet for home screen ------
const dashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F0F2FF', 
      },
      header: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#001B62', 
        fontSize: 25,
        marginBottom: 50,
        marginTop: 70,
      },
      title: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#001B62', 
        fontSize: 25,
        marginBottom: 10,
      },
      sectionTitle: {
        fontFamily: 'Poppins_500Medium',
        color: '#001B62', 
        fontSize: 25,
      },
      paragraph: {
        fontFamily: 'Poppins_500Medium',
        color: '#001B62', 
        fontSize: 16,
        marginTop: 20,
        marginBottom: 40,
      },
})

export { dashboardStyle };
