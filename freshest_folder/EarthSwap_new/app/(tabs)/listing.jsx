import { StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
//import { useUser } from '@clerk/clerk-expo';

export default function Listing() {
  const db = getFirestore(app);
  const storage = getStorage();
  const [image, setImage] = useState(null);

  // const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const categories = [];
    const querySnapshot = await getDocs(collection(db, 'Category'));

    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {

      const resp = await fetch(image);
      
      const blob = await resp.blob();
      const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          value.image=downloadUrl;
          
          const docRef = await addDoc(collection(db, "UserPost"), value)
        })
      });

}

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Add your listing now!</Text>
          <Formik 
            initialValues={{ title: '', desc: '', category: '', image: '' }}
            onSubmit={value => onSubmitMethod(value)}
            validate={values => {
              const errors = {};
              if (!values.title) {
                errors.title = 'Title must be present';
                Toast.show({
                  type: 'error',
                  text1: 'Validation Error',
                  text2: 'Title must be present'
                });
              }
              return errors;
            }}
          >
            {({ handleChange, handleSubmit, values, setFieldValue, errors, touched, isSubmitting }) => (
              <View style={styles.form}>
                <TouchableOpacity style={{ paddingBottom: 50, justifyContent: "center" }} onPress={pickImage}>
                  {image ?
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                    :
                    <Image source={require('../../assets/images/placeholder.jpg')} style={{ width: 100, height: 100, borderRadius: 15 }} />
                  }
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                {errors.title && touched.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder='Description'
                  value={values.desc}
                  numberOfLines={2}
                  onChangeText={handleChange('desc')}
                />

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={itemValue => setFieldValue('category', itemValue)}
                  >
                    {categoryList.length > 0 && categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                  </Picker>
                </View>

                <View style={{ justifyContent: 'center', paddingVertical: 100 }}>
                  <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={isSubmitting}>
                    <Text style={styles.buttonText}>POST</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <Toast />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#6A994E',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    height: 70,
  },
  button: {
    width: '100%',
    backgroundColor: '#6A994E',
    borderRadius: 60,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
