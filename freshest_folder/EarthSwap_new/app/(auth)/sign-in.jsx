import { StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {Link} from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import {createUser} from '../lib/appwrite';
import { signIn } from '../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser } from '../lib/appwrite';

const earthSwapLogo = require('../../assets/images/EarthSwapLogo.png');

const SignIn = () => {
  const {setUser, setIsLogged} = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");

      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image
            source={earthSwapLogo}
            style={styles.image}
            resizeMode='contain'
          />

          <Text style={styles.text}>
            Log in to Earth Swap
          </Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email:e})}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password:e})}
            otherStyles={[styles.formField, styles.marginTop]}
          /> 
        <CustomButton 
          title="Sign In"
          handlePress={submit}
          containerStyles={styles.buttonContainer}
        />

        </View>

        <View style={styles.textContainer}> 
            <Text style={styles.textNoAcc}>
              Don't have account?
            </Text>
            <Link href="/sign-up" style = {styles.SignUp}> Sign Up</Link>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:20,
    paddingHorizontal:20,
  },
  scrollViewContent:{
    paddingHorizontal:20,
  },
  content:{
    alignItems: 'center',
    marginBottom:15,
  },
  formField:{
    marginBottom:20,
    width:'100%',
  },
  text:{
    fontSize: 25,
    fontFamily:"Poppins-semibold",
    paddingBottom: 20,
    marginTop:-20,
  },
  image:{
    width:250 ,
    height:250,
  },
  textNoAcc:{
    fontSize:14,
    fontFamily:'Poppings-Regular',
    color:'grey',
    marginTop:1,
  },
  textContainer:{
    justifyContent:'center',
    flexDirection:'row',
  },
  SignUp:{
    fontSize:14,
    fontFamily: 'Poppins-Semibold',
    color:"B1C97A",
    marginTop:-0.5,
  },
  buttonContainer:{
  },

})

export default SignIn