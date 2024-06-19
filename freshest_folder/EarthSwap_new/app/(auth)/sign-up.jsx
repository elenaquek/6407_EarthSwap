import { StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {Link} from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import {createUser} from '../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const earthSwapLogo = require('../../assets/images/EarthSwapLogo.png');

const SignUp = () => {
  const {setUser, setIsLogged} = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

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
            Sign up to Earth Swap
          </Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username:e})}
            otherStyles={styles.formField}
          />

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
            title="Sign Up"
            handlePress={submit}
            isDisabled = {isSubmitting}
            containerStyles={styles.buttonContainer}
          />

        <View style={styles.textContainer}> 
            <Text style={styles.textNoAcc}>
              Have an account already?
            </Text>
            <Link href="/sign-in" style = {styles.SignUp}> Sign In</Link>
        </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content'/>
    </SafeAreaView>
  );
};

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
    marginTop:16,
  },
  textContainer:{
    justifyContent:'center',
    flexDirection:'row',
  },
  SignUp:{
    fontSize:14,
    fontFamily: 'Poppins-Semibold',
    color:"B1C97A",
    marginTop:14.5,
  },
  buttonContainer:{
  },
})

export default SignUp