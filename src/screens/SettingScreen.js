import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {height, width} from '../components/Diemenstions';
import React, {useEffect, useState} from 'react';
import Switch from '../components/Switch';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {QuestionMode} from '../reduxToolkit/Slice3';
import {addSetting} from '../reduxToolkit/Slice2';
import {StackActions, useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';
import {GAMBannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import ads from './Ads';
var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'eFlashSpanish.db',
  createFromLocation: 1,
});
const SettingScreen = props => {
  const tablet = isTablet();
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      Navigation.goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const muted = useSelector(state => state.sound);
  const pr = props.route.params.pr;
  const [mute, setMute] = useState(muted);
  const quesion = useSelector(state => state.question);
  const setting = useSelector(state => state.setting);
  console.log(quesion);
  const Navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [togleSwitch, setToggleSwich] = useState({
    ActualVoice: setting.ActualVoice,
    English: setting.English,
    RandomOrder: setting.RandomOrder,
    Swipe: setting.Swipe,
    Videos: setting.Videos,
    Voice: setting.Voice,
  });
  const [questionMode, setquestion] = useState(quesion);
  const handleSwitch = (name, value) => {
    if (questionMode) {
      alert('This setting is disabled when quesion mode is enabled');
    } else {
      setToggleSwich(prev => ({...prev, [name]: !value}));
    }
  };
  const Save = async () => {
    updateSettings();
    dispatch(addSetting(togleSwitch));
    dispatch(QuestionMode(questionMode));

    if (pr === 'question') {
      if (!questionMode) {
        Navigation.dispatch(StackActions.replace('details'));
      } else {
        await TrackPlayer.reset();
        Navigation.dispatch(StackActions.pop());
      }
    } else if (pr === 'details') {
      if (questionMode) {
        Navigation.dispatch(StackActions.replace('question'));
      } else {
        Navigation.dispatch(StackActions.pop());
        console.log('else called');
      }
    } else {
      Navigation.goBack();
    }
    await TrackPlayer.reset();
  };
  //SELECT * FROM tbl_settings

  const updateSettings = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE  tbl_settings set ActualVoice=?,English=?,' +
          'Question=?,RandomOrder=?,Swipe=?,' +
          'Voice=? WHERE id=1',
        [
          togleSwitch.ActualVoice,
          togleSwitch.English,
          questionMode,
          togleSwitch.RandomOrder,
          togleSwitch.Swipe,
          togleSwitch.Voice,
        ],
        (tx, results) => {
          console.log('Query completed');
        },
        err => {
          console.log(err);
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../Assets4/settingscreenimg.png')}>
        <Header onPress2={() => setMute(!mute)} mute={mute} />
        {/* <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            style={{
              height: 50,
              width: 180,
              marginTop: '30%',
              alignSelf: 'center',
            }}
            source={require('../../Assets4/btnupgrade.png')}
          />
        </TouchableOpacity> */}
        <View
          style={[
            styles.settingContainer,
            {marginTop: tablet ? '22%' : '32%'},
          ]}>
          <Modal animationType="none" transparent={true} visible={visible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Enjoy an Ad-Free Experience with Multi-tasking!
                </Text>
                <Text style={styles.modalText1}>
                  Get Ad-Free version for absolutely un-interrupted Play and
                  learn experience for your child!
                </Text>
                <Text style={styles.modalText1}>
                  Start Where you left without having to view splash screen
                  again - The upgrade supports multi-tasking.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setVisible(false)}>
                    <Text style={styles.textStyle}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <ImageBackground
            style={{flex: 1}}
            source={require('../../Assets4/settingpagebase.png')}>
            <View style={{marginTop: tablet ? '7%' : '10%', marginLeft: '5%'}}>
              <Switch
                isSetting
                text="Question mode"
                style={styles.sw}
                onPress={() => {
                  setquestion(!questionMode), setToggleSwich(pre => false);
                }}
                onFocus={() => {
                  console.log('rrrj');
                }}
                sw={questionMode}
              />
              <Switch
                text="Voice"
                style={styles.tx}
                onPress={() => handleSwitch('Voice', togleSwitch.Voice)}
                sw={togleSwitch.Voice}
              />
              <Switch
                text="Sound"
                style={styles.tx}
                onPress={() =>
                  handleSwitch('ActualVoice', togleSwitch.ActualVoice)
                }
                sw={togleSwitch.ActualVoice}
              />
              <Switch
                text="Random Order"
                style={styles.tx}
                onPress={() =>
                  handleSwitch('RandomOrder', togleSwitch.RandomOrder)
                }
                sw={togleSwitch.RandomOrder}
              />
              <Switch
                text="Swipe"
                style={styles.tx}
                onPress={() => handleSwitch('Swipe', togleSwitch.Swipe)}
                sw={togleSwitch.Swipe}
              />
              <Switch
                text="English Text"
                style={styles.tx}
                onPress={() => handleSwitch('English', togleSwitch.English)}
                sw={togleSwitch.English}
              />
              {/* <Switch
                text="Video"
                style={styles.tx}
                onPress={() => handleSwitch('Videos', togleSwitch.Videos)}
                sw={togleSwitch.Videos}
              /> */}
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '10%',
          }}>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.reset(), Navigation.goBack();
            }}>
            <Image
              style={{height: hp(6), width: wp(30)}}
              source={require('../../Assets4/btncancel_normal.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Save()}>
            <Image
              style={{height: hp(6), width: wp(30)}}
              source={require('../../Assets4/btnsave_normal.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{position: 'absolute', bottom: 0}}>
        <GAMBannerAd
          unitId={ads.BANNER}
          sizes={[BannerAdSize.FULL_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
  settingContainer: {
    borderWidth: 2,
    marginTop: '40%',
    height: height / 1.8,
    margin: '5%',
  },
  sw: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
  },
  tx: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontSize: wp(5),
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginHorizontal: 30,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    borderWidth: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: 'center',
    elevation: 2,
    height: 50,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  modalText1: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
});
