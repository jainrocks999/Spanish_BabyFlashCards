import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {height, width} from '../components/Diemenstions';
import CatagotyData from '../components/CatagotyData';
import {StackActions} from '@react-navigation/native';
import {addCat} from '../reduxToolkit/Slice5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {GAMBannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import ads from './Ads';
import {IAPContext} from '../Context';

const NextScreen = () => {
  const {hasPurchased} = useContext(IAPContext);

  const navigation = useNavigation();
  const disapatch = useDispatch();
  const cat = useSelector(state => state.cat);
  console.log(cat);
  const muted = useSelector(state => state.sound);
  const getNext = indexx => {
    // if (indexx > CatagotyData.length - 1) {
    //   navigation.reset({index: 0, routes: [{name: 'home'}]});
    //   return;
    // }
    console.log(
      'this is cate data.lgt',
      CatagotyData.length,
      'this si',
      indexx,
    );

    CatagotyData.map((item, index) => {
      if (index === indexx + 1) {
        let catdata = {
          Category: item.Category,
          index: index,
        };
        if (item.Category !== 'More') {
          navigation.dispatch(StackActions.replace('details'));
          disapatch(addCat(catdata));
        } else {
          navigation.reset({index: 0, routes: [{name: 'home'}]});
        }
      }
    });
  };

  const [mute, setMut] = useState(muted);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#73cbea'}}>
      <ImageBackground
        resizeMode="stretch"
        style={{flex: 1}}
        source={require('../../Assets4/settingscreenimg.png')}>
        <Header onPress2={() => setMut(!mute)} mute={mute} />
        <View
          style={{
            top: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            width: '90%',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '33%',
            }}>
            <TouchableOpacity
              style={{
                height: hp('8%'),
                width: hp('8%'),
              }}
              onPress={() => {
                navigation.dispatch(StackActions.replace('details'));
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../Assets4/btnrepeat_normal.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp('3%'),
                fontWeight: '500',
                color: 'red',
                marginTop: 5,
                elevation: 5,
              }}>
              Repeat
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '33%',
            }}>
            <TouchableOpacity
              onPress={() => getNext(cat.index)}
              style={{height: hp('8%'), width: hp('8%')}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../Assets4/btnnextcatg_normal.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp('3%'),
                fontWeight: '500',
                color: 'red',
                marginTop: 5,
                elevation: 5,
              }}>
              Next
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '33%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.replace('home'))}
              style={{height: hp('8%'), width: hp('8%')}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../Assets4/btnhome_normal.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp('3%'),
                fontWeight: '500',
                color: 'red',
                marginTop: '5%',
                elevation: 5,
              }}>
              Home
            </Text>
          </View>
        </View>
        {!hasPurchased ? (
          <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
            <GAMBannerAd
              unitId={ads.BANNER}
              sizes={[BannerAdSize.FULL_BANNER]}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NextScreen;
