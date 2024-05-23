import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {Tabs, Redirect} from 'expo-router';
import {icons} from '../../constants';

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
      <Tabs>
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
      </Tabs>
    </>
  )
}

export default TabsLayout