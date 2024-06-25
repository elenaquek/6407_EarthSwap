
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc} from "firebase/firestore";
import Categories from '../../components/Homescreen/Categories';



const sampleData = [
  { id: '1', title: 'Doraemon phonecase Iphone 15 Plus', image: 'https://drive.google.com/uc?export=view&id=1IAoEb9-jl8ggfP1aCKiEXg6ZNQshxNDk' },
  { id: '2', title: 'Sanrio keychains', image: 'https://drive.google.com/uc?export=view&id=1aZ7lIjvs33qILBHIHgJyEWY2HRoHspE0' },
  { id: '3', title: 'White button up blouse', image: 'https://drive.google.com/uc?export=view&id=1SLML7B0bRW2SDgoaEcbOmv_lHAHmhqCX' },
  { id: '4', title: 'Soft toys', image: 'https://drive.google.com/uc?export=view&id=1xfMo3gYZY6oWjMErPA4ihX5HJknSRdh4' },
  { id: '5', title: 'Book: What on Earth am I Here For?', image: 'https://drive.google.com/uc?export=view&id=1xORfB6I7zh3zqXISi5dFCmVxQSf6HpR8' },
  { id: '6', title: 'Vintage bag', image: 'https://drive.google.com/uc?export=view&id=1z-0DMFFm4WVp1649v7m43-OGl_bj_3-C' },
  { id: '7', title: 'Item 7', image: 'https://via.placeholder.com/100' },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

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
        data={formatData(sampleData, 2)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={[styles.itemContainer, styles.itemInvisible]} />;
          }
          return (
            <TouchableOpacity 
              style={styles.itemContainer}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <View style={styles.itemWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.searchContainer}>
              <Image source={require('../../assets/icons/search.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search for items..."
              />
            </View>
            <View style={styles.forYouContainer}>
              <Text style={styles.forYouTitle}>Listings for you</Text>
            </View>
            <Categories categoryList={categoryList}/>

          </View>
        )}
        columnWrapperStyle={styles.row}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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

export default HomeScreen;