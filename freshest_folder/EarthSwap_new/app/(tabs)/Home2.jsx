/*import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import Categories from '../../components/Homescreen/Categories';


export default function Home2() {

    const db = getFirestore(app);
    const [categoryList, setCategoryList]=useState([]);

    useEffect(()=>{
        getCategoryList()
    },[])

    const getCategoryList = async () => {
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
        <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.searchContainer}>
              <Image source={require('../../assets/icons/search.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search for items..."
                onChangeText={(value)=>console.log(value)}
              />
            </View>
            <View style={styles.forYouContainer}>
              <Text style={styles.forYouTitle}>Listings for you</Text>
            </View>
          </View>
        )}
      />
      <Categories categoryList={categoryList}/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    headerContainer: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
      tintColor: 'black',
    },
    searchBar: {
      flex: 1,
      height: 40,
    },
    forYouContainer: {
      marginBottom: -10,
    },
    forYouTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 15,
      justifyContent:"space-between"
    },
    categoriesList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    categoryItem: {
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      padding: 8,
      marginRight: 8,
      marginBottom: 8,
    },
    row: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    itemContainer: {
      flex: 1,
      marginVertical: 20,
      marginHorizontal: 13,
      backgroundColor: '#fff',
    },
    itemInvisible: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    itemWrapper: {
      alignItems: 'center',
    },
    itemImage: {
      width: '100%',
      height: 180,
    },
    itemTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
  });
  
*/