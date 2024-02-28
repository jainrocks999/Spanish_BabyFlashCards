import {View, Text, Image, SafeAreaView} from 'react-native';
import React, {startTransition, useEffect} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 2000);
  });
  return (
    <SafeAreaView style={{backgroundColor: '#d7f4ff'}}>
      <Image
        resizeMode="stretch"
        source={require('../../Assets4/splashimm.png')}
        style={{width: '100%', height: '100%'}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
