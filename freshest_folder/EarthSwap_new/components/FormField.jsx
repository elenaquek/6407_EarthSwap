import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {icons} from '../constants'

const FormField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={[styles.Container,otherStyles]}>
            <Text style={styles.text}>
                {title}
            </Text>
            <View style={styles.Container}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    style={styles.input}
                    secureTextEntry = {title === 'Password' && !showPassword}
                    {...props}
                />

                {title === 'Password' && (
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)} 
                        style={styles.eyeIconContainer}
                    >
                        <Image 
                            source={!showPassword ? icons.eye : icons.eyehide} 
                            style={styles.eyeIcon} 
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    text:{
        fontSize:16,
        fontWeight:'500',
        marginBottom:10,
    },
    input:{
        borderWidth:1,
        borderColor:'gray',
        padding:10,
        borderRadius:10,
    },
    Container:{
        position:'relative',
    },
    eyeIconContainer:{
        position:'absolute',
        right:10,
        top:'23%',     
    },
    eyeIcon:{
        width:24,
        height:24,
    },
})

export default FormField;