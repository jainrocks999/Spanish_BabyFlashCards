import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  GAMBannerAd,
} from 'react-native-google-mobile-ads';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../reduxToolkit/Slice';
import HorizontalList from '../components/HorizontalList';
import Header from '../components/Header';
import MyData from '../components/CatagotyData';
import {useNavigation} from '@react-navigation/native';
var SQLite = require('react-native-sqlite-storage');
import {addSetting} from '../reduxToolkit/Slice2';
import {QuestionMode} from '../reduxToolkit/Slice3';
import {SafeAreaView} from 'react-native-safe-area-context';
import ads from './Ads';
import {IAPContext} from '../Context';
import PurcahsdeModal from '../components/requestPurchase';
const db = SQLite.openDatabase({
  name: 'eFlashSpanish.db',
  createFromLocation: 1,
});
console.log(db);
const Home = () => {
  const muted = useSelector(state => state.sound);
  const {hasPurchased, requestPurchase, checkPurchases, visible, setVisible} =
    useContext(IAPContext);
  const Navigation = useNavigation();
  const [mute, setMute] = useState(muted);

  const dispatch = useDispatch();
  const adUnitId = TestIds.BANNER;
  useEffect(() => {
    getData();
    getSettings();
  }, []);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_items ',
        [],
        (tx, results) => {
          console.log(' item query Query completed');
          let arr = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            arr.push(row);
          }

          dispatch(addData(arr));
        },
        err => {
          console.log(err);
        },
      );
    });
  };

  const getSettings = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM  tbl_settings',
        [],
        (tx, results) => {
          var len = results.rows.length;

          let row = results.rows.item(0);

          console.log(row);

          dispatch(addSetting(row));

          dispatch(QuestionMode(row.Question));
        },
        err => {
          console.log(err);
        },
      );
    });
  };
  const onClose = value => {
    setVisible(value);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#73cbea'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../Assets4/bgnewcategory.png')}>
        <Header
          onPress2={() => setMute(!mute)}
          mute={mute}
          onPressPuchase={() => setVisible(true)}
          onPress3={() => setVisible(true)}
          onPress={() => Navigation.navigate('setting', {pr: 'home'})}
          home
          hasPurchased={hasPurchased}
        />

        {!hasPurchased ? (
          <PurcahsdeModal
            onPress={async () => {
              requestPurchase();
              setVisible(false);
            }}
            onClose={onClose}
            visible={visible}
            onRestore={() => {
              checkPurchases(true);
            }}
          />
        ) : null}
        <HorizontalList items={MyData} />
        {!hasPurchased ? (
          <View style={{alignSelf: 'center'}}>
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

export default Home;

const styles = StyleSheet.create({
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
