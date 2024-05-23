import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:45, fontFamily: "Poppins-Black"}}>Earth Swap</Text>
      <StatusBar style="auto" />
      <Link href ="/Home" style ={{color:'black'}}>Go to Home</Link>
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