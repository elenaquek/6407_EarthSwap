import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import CustomButton from '../components/CustomButton';
import 'react-native-url-polyfill/auto';
import { useGlobalContext } from '../context/GlobalProvider';
import Toast from 'react-native-toast-message';


const earthSwapLogo = require('../assets/images/EarthSwapLogo.png');

export default function App() {
  const { Loading, isLogged } = useGlobalContext();

  if (!Loading && isLogged) return <Redirect href="/Home" />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style = {styles.container}>
          <Image 
            source={earthSwapLogo}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.boldTextContainer}>
            <Text style={styles.boldText}> Earth Swap</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style = {styles.text}>
              Make swapping the new shopping!
            </Text>

            <CustomButton
              title = "Continue with email"
              handlePress = {()=> router.push('/sign-in')}
              containerStyles={styles.buttonContainer}/>

          </View>
        </View>
      </ScrollView>
      <Toast  />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //paddingHorizontal:25,
    paddingTop:60,
  },
  image:{
    width:400 ,
    height:400,
  },
  boldTextContainer:{
    //position:'absolute',
    marginBottom:20,
    marginTop:-30,
  },
  boldText:{
    fontSize:40,
    fontFamily:'Poppins-Bold',
    paddingHorizontal:30,
    marginTop:-10,
  },
  textContainer:{
    //position:'absolute',
    marginBottom:20,
    marginTop:-20,
    alignItems:'center',
  },
  text:{
    fontSize:19,
    fontFamily:'Poppins-Regular',
    marginTop:10,
  },
  buttonContainer:{
    width:'100%',
    marginTop:20,
  },
});
