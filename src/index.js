import {AppState, BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import MyStack from './components/MyStack';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import Ads from './screens/Ads';
import {IAPContext} from './Context';

const Root = () => {
  const {hasPurchased} = useContext(IAPContext);
  console.log('hasPurchased', hasPurchased);

  const interstitial = InterstitialAd.createForAdRequest(Ads.interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function handleBackButtonClick() {
    if (!hasPurchased) {
      showAdd1();
    } else {
      BackHandler.exitApp();
    }

    return true;
  }
  const showAdd1 = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
        BackHandler.exitApp();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  return <MyStack />;
};

export default Root;

const styles = StyleSheet.create({});
