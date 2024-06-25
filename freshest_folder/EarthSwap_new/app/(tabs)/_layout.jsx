import { StyleSheet, Text, View, Image, ToastAndroid } from 'react-native';
import React from 'react';
import {Tabs, Redirect} from 'expo-router';
import {icons} from '../../constants';
import Toast from 'react-native-toast-message';


const TabIcon = ({icon,color,name,focused}) => {
  return (
    <View>
      <Image
        source ={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 20, height: 20, tintColor: color }}
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions = {{
          tabBarActiveTintColor: '#B1C97A',
          tabBarInactiveTintColor: '#CDCDE0',
        }}
      >
        <Tabs.Screen 
          name ="Home" 
          options={{
            title:'Home',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon = {icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name ="listing" 
          options={{
            title:'listing',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon = {icons.plus}
                color={color}
                name="listing"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen 
          name ="profile" 
          options={{
            title:'Profile',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon = {icons.profile}
                color={color}
                name="profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
      <Toast/>
      </>
  )
}

export default TabsLayout