import { Text, Image, ScrollView, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import React, {useState} from 'react';

import overallHealthStyle from '../../stylesheet/overallHealthStyle';
import mainStyles from '../../stylesheet/mainStyle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomNav from '../../component/progressBar';
import { Ionicons } from '@expo/vector-icons';
import overallHealthStyles from '../../stylesheet/overallHealthStyle';

import Up from '../../assets/icons/up.svg';
import Down from '../../assets/icons/down.svg';
import Share from '../../assets/icons/share.svg';


export default function OverallHealth() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({}); // Object to track each accordion's state


  const handleToggle = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the specific section
    }));
  };

  const handleSharePress2 = () => {
    Linking.openURL('https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/dance-for-your-bones/?_gl=1*1iz28ge*_up*MQ..*_gs*MQ..*_ga*NjEzMTQ2MjYuMTczMzIxMjg5Ng..*_ga_LE28KHFKJD*MTczMzIxMjg5Ni4xLjAuMTczMzIxMjg5Ni4wLjAuMA..&gclid=CjwKCAiA0rW6BhAcEiwAQH28Io2-WsJthyhC2sD0nVau03kw0ktOxTZL0iD0Bd_GheblkIBYmrqBehoCILMQAvD_BwE/').catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handleSharePress3 = () => {
    Linking.openURL('https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/how-to-build-up-exercise-for-your-bone-strength/?_gl=1*1bti0ik*_up*MQ..*_gs*MQ..&gclid=CjwKCAiA0rW6BhAcEiwAQH28Io2-WsJthyhC2sD0nVau03kw0ktOxTZL0iD0Bd_GheblkIBYmrqBehoCILMQAvD_BwE').catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };


  const handleSharePress4 = () => {
    Linking.openURL('https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/how-to-build-up-exercise-for-your-bone-strength/?_gl=1*1bti0ik*_up*MQ..*_gs*MQ..&gclid=CjwKCAiA0rW6BhAcEiwAQH28Io2-WsJthyhC2sD0nVau03kw0ktOxTZL0iD0Bd_GheblkIBYmrqBehoCILMQAvD_BwE').catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };


  const handleSharePress5 = () => {
    Linking.openURL('https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/dance-for-your-bones/?_gl=1*1iz28ge*_up*MQ..*_gs*MQ..*_ga*NjEzMTQ2MjYuMTczMzIxMjg5Ng..*_ga_LE28KHFKJD*MTczMzIxMjg5Ni4xLjAuMTczMzIxMjg5Ni4wLjAuMA..&gclid=CjwKCAiA0rW6BhAcEiwAQH28Io2-WsJthyhC2sD0nVau03kw0ktOxTZL0iD0Bd_GheblkIBYmrqBehoCILMQAvD_BwE').catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };


  const handleSharePress = () => {
    Linking.openURL('https://www.niams.nih.gov/').catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };


  return (
    <ScrollView style={mainStyles.container}>
      {/* Overview */}
      <Image
        source={require('../../assets/icons/overallHealth2.png')}
        style={mainStyles.heroIcon}
      />
      <Text style={mainStyles.heading1}>Insights & Resources</Text>
      <Text
        style={[
          mainStyles.paragraph,
          overallHealthStyle.overallOverviewParagraph,
        ]}
      >
        A resource hub offering insights into osteoporosis, its management, and
        helpful tools for better bone health.
      </Text>

      {/* Understanding Osteoporosis */}
      <Text style={[mainStyles.heading3, overallHealthStyle.boneHealthScoreHeading]}>
        Understanding osteoporosis
      </Text>
      <Text
        style={[
          mainStyles.paragraph,
          overallHealthStyle.boneHealthScoreParagraph,
        ]}
      >
        Osteoporosis is a condition where bones become weak and brittle, making
        them more likely to fracture. It occurs when bone density decreases and
        the structure of bone tissue becomes fragile.
      </Text>

      <Text style={[mainStyles.heading3, overallHealthStyle.boneHealthScoreHeading]}>
        FAQ
      </Text>

      {/* Accordion Sections */}
      {[
        {
          title: 'Who is at risk?',
          content: (
            <>
              <Text style={styles.paragraph}>
                Osteoporosis can affect anyone, but certain factors increase the
                risk:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Age:</Text> Bone density declines
                  after your mid-30s and accelerates after menopause in women.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Sex:</Text> Women are more likely
                  to develop osteoporosis than men.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Family History:</Text> A history
                  of osteoporosis or fractures increases risk.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Body Type:</Text> Being tall or
                  underweight can raise the likelihood.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Hormones:</Text> Low estrogen in
                  women or testosterone in men impacts bone health.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Lifestyle:</Text> Smoking, heavy
                  alcohol use, inactivity, and poor diet.
                </Text>
              </View>
            </>
          ),
        },
        {
          title: 'How can I improve my bone health?',
          content: (
            <>
              <Text style={styles.paragraph}>
                Improving bone health involves having a nutritious diet, regular
                exercise, and healthy lifestyle choices.
              </Text>
              <Text style={styles.paragraph}>
                Avoiding habits like smoking and excessive alcohol consumption
                is also essential, as they can weaken bones over time.
              </Text>
              <Text style={styles.paragraph}>
                Additionally, creating a safe environment to minimize fall risks
                is an important step in protecting bone health.
              </Text>
            </>
          ),
        },
        {
          title: 'What exercises are safe to do?',
          content: (
            <>
              <Text style={styles.paragraph}>
                Exercise helps strengthen bones and improve balance, reducing
                the risk of falls. Two key types of exercises are particularly
                beneficial:
              </Text>
              <View style={styles.list}>
              <Text style={styles.listItem}>
                •{' '}
                <Text style={styles.bold}>
                  Weight-Bearing Impact Exercises:
                </Text>{' '}
                Activities like walking, dancing, and low-impact aerobics. They
                involve moving against gravity while staying upright, stimulating
                bone growth and maintaining density.
              </Text>
              <Text style={styles.listItem}>
                •{' '}
                <Text style={styles.bold}>
                  Muscle-Strengthening Exercises:
                </Text>{' '}
                Activities such as resistance training or using resistance bands
                build muscle strength, which supports and protects your bones.
              </Text>
              </View>

              <Text style={styles.paragraph}>
               Resources:
              </Text>

              <Image source={require('../../assets/images/resource1.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Exercises for bone and muscle strength</Text>
                <TouchableOpacity>
                  <Share width={24} height={24} style={styles.shareIcon} onPress={handleSharePress} />
                </TouchableOpacity>
              </View>

              <Image source={require('../../assets/images/resource2.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Dance for your bones</Text>
                <TouchableOpacity>
                  <Share width={24} height={24} style={styles.shareIcon} onPress={handleSharePress2} />
                </TouchableOpacity>
              </View>

              <Image source={require('../../assets/images/resource3.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Dance for your bones</Text>
                <TouchableOpacity>
                  <Share width={24} height={24} style={styles.shareIcon} onPress={handleSharePress3} />
                </TouchableOpacity>
              </View>
            </>
          ),
        },
        {
          title: 'What should I eat to help my bones?',
          content: (
            <>
              <Text style={styles.paragraph}>
                Eating a balanced diet rich in key nutrients is essential for
                bone health. Focus on:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Calcium:</Text> Essential for bone
                  strength. Found in dairy products, leafy greens (like kale and
                  broccoli), and fortified plant-based milk.
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Vitamin D:</Text> Helps your body
                  absorb calcium. Sources include fatty fish (like salmon), egg
                  yolks, and fortified foods (like milk and cereals).
                </Text>
                <Text style={styles.listItem}>
                  • <Text style={styles.bold}>Protein:</Text> Supports bone
                  structure. Include lean meats, beans, tofu, and nuts in your
                  diet.
                </Text>
              </View>

              <Text style={styles.paragraph}>
               Resources:
              </Text>

              <Image source={require('../../assets/images/resource4.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Nutrition Guidelines</Text>
                <TouchableOpacity>
                  <Share width={24} height={24} style={styles.shareIcon} onPress={handleSharePress4} />
                </TouchableOpacity>
              </View>

              <Image source={require('../../assets/images/resource5.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Suggested recipes</Text>
                <TouchableOpacity>
                  <Share width={24} height={24} style={styles.shareIcon} onPress={handleSharePress5} />
                </TouchableOpacity>
              </View>
            </>
          ),
        },
      ].map((item, index) => (
        <View key={index} style={styles.card}>
          {/* Header */}
          <TouchableOpacity
            style={styles.header}
            onPress={() => handleToggle(index)}
          >
            <Text style={styles.headerText}>{item.title}</Text>
            {expandedSections[index] ? (
              <Up width={20} height={20} marginRight={15}  marginTop={5}/>
            ) : (
              <Down width={20} height={20} marginRight={15}  marginTop={5} />
            )}
          </TouchableOpacity>

          {/* Content */}
          {expandedSections[index] && (
            <View style={styles.content}>{item.content}</View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001B62',
  },
  card: {
    backgroundColor: '#F0F2FF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#001B62',
    fontFamily: 'Poppins_500Medium',
    marginLeft: 15,
    marginTop: 10,
  },
  content: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#D5DBF2',

  },
  paragraph: {
    fontSize: 16,
    color: '#001B62',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 20,
    marginRight: 15,
  },
  list: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,

  },
  listItem: {
    fontSize: 16,
    color: '#001B62',
    marginBottom: 10,
    
  },
  bold: {
    fontFamily: 'Poppins_500Medium',
  },
  
  image: {
    width: '90%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginLeft: 15,
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#001B62',
    flex: 1,
  },
  shareIcon: {
    marginLeft: 10,
  },
 
});