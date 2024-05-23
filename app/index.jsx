import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:45, fontFamily: "Poppins-Black"}}>EARTH SWAP</Text>
      <StatusBar style="auto" />
      <Link href ="/Home" style ={{color:'black'}}>gooo HOME</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
  },
});