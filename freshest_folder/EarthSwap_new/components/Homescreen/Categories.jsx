import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import React from 'react'

export default function Categories({categoryList}) {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.Header}>Categories</Text>

      <FlatList
      data={categoryList}
      horizontal={true}

      renderItem={({item, index})=>(
        <TouchableOpacity style={styles.container}>
          <Text style={styles.categoryItem}>{item.name}</Text>
        </TouchableOpacity>
      )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1C97A',
    alignItems:"center",
    justifyContent:"space-evenly",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 3

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
  Header: {
    fontSize: 20,
    fontWeight:"semibold",
    marginBottom: 15,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
    marginTop: 2,
    color: 'white'

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

