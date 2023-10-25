import { View, Text, Image } from 'react-native'
import React, { startTransition, useEffect } from 'react'
import { StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
             navigation.dispatch(StackActions.replace('home'))
        }, 2000);
    })
     return (
        <View style={{}}>
        <Image
     source={require('../../Assets4/splashimm.png')}
          style={{ width:'100%', height:'100%' }}
     
        />
      </View>
    );
  };
    

export default SplashScreen