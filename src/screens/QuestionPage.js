import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {height, width} from '../components/Diemenstions';
import {StyleSheet} from 'react-native';
import {setupPlayer} from '../components/Setup';
import TrackPlayer from 'react-native-track-player';
import {RightVOid, WrongVoid} from '../components/WrongVoid';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isTablet} from 'react-native-device-info';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ads from './Ads';
const QuestionPage = props => {
  const interstitial = InterstitialAd.createForAdRequest(ads.interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });
  const tablet = isTablet();
  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
        setCount(2);
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  const documentsPath =
    Platform.OS === 'android'
      ? 'asset:/files/'
      : RNFS.MainBundlePath + '/files/';

  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      navigation.dispatch(StackActions.popToTop());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const navigation = useNavigation();
  const [song, setSong] = useState();
  const [x, setX] = useState(0);
  const [wrong0, setWrong0] = useState(false);
  const [wrong1, setWrong1] = useState(false);
  const [wrong2, setWrong2] = useState(false);
  const [wrong3, setWrong3] = useState(false);
  const [count, setCount] = useState(1);
  const cat = useSelector(state => state.cat);
  const data = useSelector(state =>
    state.Items.filter(item => item.Category === cat.Category),
  );
  const IsPlay = async (item, index) => {
    let isReady = await setupPlayer();

    if (count > 7) {
      showAdd();
      setCount(1);
    }
    await TrackPlayer.reset();
    let arr = [
      (track = {
        url: require('../../asset2/clickon.mp3'), // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        //  artwork: require('../../asset2/clickon.mp3'),
        duration: null,
      }),
      (track2 = {
        url: documentsPath + item.Sound, // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        //  artwork: require('../../asset2/clickon.mp3'),
        duration: null,
      }),
    ];
    if (isReady) {
      await TrackPlayer.add(arr);
      await TrackPlayer.play();
    }

    setSong(arr);
    setCount(count + 1);
  };

  const [rendomdat, setrandomDat] = useState(data.slice(0, 4));
  const up = async indexx => {
    await TrackPlayer.reset();

    let traxck;
    let track2;
    WrongVoid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index === 1) {
        traxck = item;
      }
    });
    RightVOid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index === 1) {
        track2 = item;
      }
    });

    if (indexx === x) {
      if (x != 0) {
        setWrong0(true);
      }
      if (x != 1) {
        setWrong1(true);
      }
      if (x != 2) {
        setWrong2(true);
      }
      if (x != 3) {
        setWrong3(true);
      }
      await TrackPlayer.add(track2);
      setTimeout(() => {
        setWrong0(false);
        setWrong1(false);
        setWrong2(false);
        setWrong3(false);
        setrandomDat(data.sort(() => Math.random() - 0.5).slice(0, 4));
      }, 2000);
    } else {
      await TrackPlayer.add(traxck);
      switch (indexx) {
        case 0:
          setWrong0(true);
          break;
        case 1:
          setWrong1(true);
          console.log(indexx);
          break;
        case 2:
          setWrong2(true);
          break;
        case 3:
          setWrong3(true);
          break;
      }
    }

    await TrackPlayer.play();
  };

  useEffect(() => {
    run();
  }, [rendomdat]);

  const run = async () => {
    await TrackPlayer.reset();
    let y = Math.floor(Math.random() * 4);
  
    rendomdat.map((item, index) => {
      if (index === y) {
        IsPlay(item, index);
        setX(y);
      }
    });
  };

  const sound = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(song);
    await TrackPlayer.play();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.reset(),
              navigation.dispatch(StackActions.popToTop());
          }}>
          <Image
            style={styles.icon}
            source={require('../../Assets4/btnhome_normal.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sound()}>
          <Image
            style={styles.btn2}
            source={require('../../Assets4/btnrepeat_normal.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.reset(),
              navigation.dispatch(
                StackActions.push('setting', {pr: 'question'}),
              );
          }}>
          <Image
            style={styles.icon}
            source={require('../../Assets4/btnsetting_normal.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: tablet ? '5%' : '15%', alignSelf: 'center'}}>
        <FlatList
          data={rendomdat}
          numColumns={2}
          keyExtractor={item => item.ID}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  {
                    margin: '1%',
                    marginHorizontal: '1%',
                    marginVertical: '6%',
                    height: height / 3.2,
                    width: width / 2.15,
                  },
                ]}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={{uri: documentsPath + item.Image}}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.worgImgContainer}>
        <TouchableOpacity onPress={() => up(0)} style={styles.wrongImg1}>
          {wrong0 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => up(1)} style={styles.wrongImg2}>
          {wrong1 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.worgImgContainer2}>
        <TouchableOpacity onPress={() => up(2)} style={styles.wrongImg1}>
          {wrong2 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => up(3)} style={styles.wrongImg2}>
          {wrong3 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuestionPage;
const styles = StyleSheet.create({
  icon: {
    height: hp(7),
    width: hp(7),
    margin: '1%',
  },
  Titel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    alignSelf: 'center',
    marginTop: '15%',
  },
  wrongImg1: {
    height: hp(35),
    width: wp(47),
    margin: '1%',
    marginLeft: '2%',
  },
  wrongImg2: {
    height: hp(35),
    width: wp(47),

    marginLeft: '1%',
    marginTop: '1%',
  },
  worgImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '15.5%',
  },
  worgImgContainer2: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10.8%',
  },
});
