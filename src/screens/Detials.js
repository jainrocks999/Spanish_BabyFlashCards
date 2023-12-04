import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {height, width} from '../components/Diemenstions';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from '../components/Setup';
import {} from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import {StackActions, useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addCat} from '../reduxToolkit/Slice5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import ads from './Ads';
const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(ads.interstitial, {
  requestNonPersonalizedAdsOnly: true,
});
const Detials = props => {
  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  };
  const disapatch = useDispatch();
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
  const [Images, setImages] = useState('');
  const [Title, setTitle] = useState();
  const [count, setCount] = useState(0);
  const [Music, setMusic] = useState();
  const [Word, setWord] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, [count]);

  const setting = useSelector(state => state.setting);

  useEffect(() => {
    setupPlayer();
  }, [Music]);
  const cat = useSelector(state => state.cat);

  data = useSelector(state =>
    state.Items.filter(item => item.Category === cat.Category),
  );
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let newData;
  if (setting.RandomOrder) {
    const shuffledData = shuffle([...data]);
    newData = [...shuffledData];
  } else {
    newData = [...data]?.sort((a, b) => {
      const titleA = a.Title.toUpperCase();
      const titleB = b.Title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }

  const getData = async () => {
    let isSetup = await setupPlayer();
    await TrackPlayer.reset();
    let Imagess;
    let Titel;
    let track;
    let track2;
    let ActualSound;
    let Word;
    let y = data.length;
    if (count >= 0 && count <= y - 1) {
      newData.map(async (item, index) => {
        if (index == count) {
          Imagess = documentsPath + item.Image;
          Titel = item.Title;
          Word = item.Word;
          track = {
            url: documentsPath + item.Sound, // Load media from the file system
            title: 'Ice Age',
            artist: 'deadmau5',
            // Load artwork from the file system:
            artwork: `asset:/files/${item.Sound}`, //ActualSound
            duration: null,
          };
          track2 = {
            url: documentsPath + item.ActualSound, // Load media from the file system
            title: 'Ice Age',
            artist: 'deadmau5',
            // Load artwork from the file system:
            artwork: `asset:/files/${item.Sound}`,
            duration: null,
          };
          if (item.ActualSound != 1) {
            ActualSound = item.ActualSound;
          }
        }
      });
    } else if (count < 0) {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      showAdd();
    } else {
      navigation.dispatch(StackActions.replace('next'));
      showAdd();
    }
    setImages(Imagess);
    setTitle(Titel);
    setWord(Word);
    if (ActualSound && setting.ActualVoice && setting.Voice) {
      setMusic([track2, track]);
    } else if (ActualSound && setting.ActualVoice) {
      setMusic(track2);
    } else {
      setMusic(track);
    }
    if (isSetup) {
      if (ActualSound && setting.ActualVoice && setting.Voice) {
        await TrackPlayer.add([track2, track]);
      } else if (ActualSound && setting.ActualVoice) {
        await TrackPlayer.add(track2);
      } else if (setting.Voice) {
        await TrackPlayer.add(track);
      }
    }
    await TrackPlayer.play();
  };
  const paly = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(Music);
    await TrackPlayer.play();
  };

  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeLeft={() => setting.Swipe && setCount(count + 1)}
      onSwipeRight={() => setting.Swipe && setCount(count - 1)}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
            <Text style={styles.Titel}>{setting.English && Title}</Text>
            <Text style={styles.Word}>{setting.English && Word}</Text>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.reset(),
                  navigation.dispatch(
                    StackActions.push('setting', {pr: 'details'}),
                  );
              }}>
              <Image
                style={styles.icon}
                source={require('../../Assets4/btnsetting_normal.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            {Images && (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  resizeMode: 'contain',
                }}
                source={{uri: Images}}
              />
            )}
          </View>
          <View style={styles.btnContainer}>
            <View style={[styles.btn]}>
              {!setting.Swipe && count > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    setCount(count - 1);
                  }}>
                  <Image
                    style={styles.btn}
                    source={require('../../Assets4/btnprevious_normal.png')}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                paly();
              }}>
              <Image
                style={[styles.btn2]}
                source={require('../../Assets4/btnrepeat_normal.png')}
              />
            </TouchableOpacity>
            <View style={styles.btn}>
              {!setting.Swipe && (
                <TouchableOpacity
                  onPress={async () => {
                    setCount(count + 1);
                  }}>
                  <Image
                    style={styles.btn}
                    source={require('../../Assets4/btnnext_normal.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
};
export default Detials;

const styles = StyleSheet.create({
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    paddingHorizontal: wp(2),
  },
  icon: {
    height: hp(7),
    width: hp(7),
    margin: 5,
  },
  Titel: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  Word: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  imgContainer: {
    //marginTop: '-25%',
    borderWidth: 1,
    height: '85%',
  },
  btnContainer: {
    position: 'absolute',
    bottom: '9%',
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(1.5),
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn: {
    height: hp(6),
    width: wp(35),
    margin: '1%',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    margin: '1%',
  },
});
