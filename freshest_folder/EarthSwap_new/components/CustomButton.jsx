import {TouchableOpacity,Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = ({title, handlePress, containerStyles, textStyles, isDisabled}) => {
    return(
        <TouchableOpacity 
            style = {[styles.button, containerStyles, isDisabled && styles.disabledButton]}
            onPress={!isDisabled ? handlePress: () => console.log("Button is disabled")}
            activeOpacity={0.7}
            disabled={isDisabled}>
            <Text style={[styles.buttonText, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#B1C97A',
        padding:15,
        borderRadius:10,
        //position: 'absolute',
        alignSelf:'center',
        width:'100%',
        marginTop:20,
    },
    buttonText:{
        textAlign:'center',
        color:'black',
    },
    disabledButton:{
        backgroundColor:'#CCCCCC',
    },
})

export default CustomButton;

