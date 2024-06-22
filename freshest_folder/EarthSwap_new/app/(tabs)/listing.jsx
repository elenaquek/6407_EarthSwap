import { StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {app} from '../../firebaseConfig';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';

 
export default function Listing(){
  
  const db = getFirestore(app);

  useEffect(()=>{
    getCategoryList();
  },[])

  const [categoryList, setCategoryList] = useState([]);

  
  const getCategoryList=async()=>{

    setCategoryList([]);
    const categories = [];
    const querySnapshot = await getDocs(collection(db, 'Category'));
    
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:30, fontFamily: 'Poppins-Semibold', color:"B1C97A", marginTop:-0.5,}}> Add your listing now!</Text>
      <Formik
        initialValues={{title:'',desc:'',category:'', image:''}}
        onSubmit={value=>console.log(value)}
      >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue})=>(
          <View>

            <TouchableOpacity onPress={()=>console.log('Image Clicked')}>
            <Image source={require('../../assets/images/placeholder.jpg')} style={{width:100, height:100,borderRadius:15}}
            />
            </TouchableOpacity>

            <TextInput
              style={styles.text}
              placeholder='Title'
              value={values.titles}
              onChangeText={handleChange('title')}
            />
            
            <TextInput
              style={styles.text}
              placeholder='Description'
              value={values.desc}
              numberOfLines={5}
              onChangeText={handleChange('desc')}
            />

            <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
              <Picker
              selectedValue={values.category}
              style={styles.textContainer}
              onValueChange={(itemValue) => setFieldValue('category', itemValue)}
            >
              {categoryList.length >0 && categoryList.map ((item,index)=>(
                <Picker.Item 
                key={index}
                label={item.name} 
                value={item.name}
                />

              ))}
              </Picker> 
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
              <Text style={styles.text}>POST</Text>
            </TouchableOpacity>

          </View>
        
        )}
      </Formik>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    paddingHorizontal:10,
  },
  container:{
    flex:1,
    paddingTop:20,
    paddingHorizontal:20,
  },

  buttonContainer: {
    padding: 4,
    backgroundColor: '#007bff', // blue-500 equivalent in hex or RGB
    borderRadius: 999, // rounded-full equivalent (large value for full circle)
    marginTop: 10,
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
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
    borderWidth:1,
    borderRadius:10,
    padding:10,
    paddingHorizontal:17,
  },
  button:{
    width:'100%',
    marginTop:20,
  },
});
