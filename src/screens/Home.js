import { StyleSheet, Text, View, ImageBackground ,Modal,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BannerAd,TestIds,BannerAdSize,InterstitialAd, } from 'react-native-google-mobile-ads';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../reduxToolkit/Slice';
import HorizontalList from '../components/HorizontalList';
import Header from '../components/Header';
import MyData from '../components/CatagotyData';
import { useNavigation } from '@react-navigation/native';
var SQLite = require('react-native-sqlite-storage');
import { addSetting } from '../reduxToolkit/Slice2';
import { QuestionMode } from '../reduxToolkit/Slice3';
import { SafeAreaView } from 'react-native-safe-area-context';
const db = SQLite.openDatabase({ name: "eFlashSpanish.db", createFromLocation: 1 });
console.log(db);
const Home = () => {;
  const muted = useSelector(state => state.sound);
  const Navigation = useNavigation();
  const [mute, setMute] = useState(muted);
  const [visible ,setVisible]=useState(false);

  const dispatch = useDispatch();
  const adUnitId =  TestIds.BANNER ;
  useEffect(() => {
    getData()
    getSettings()

  }, [])

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_items ', [], (tx, results) => {
        console.log(" item query Query completed");
        let arr = []
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          arr.push(row)
          console.log(row)
        }
      
        dispatch(addData(arr))
      },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  const getSettings = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM  tbl_settings', [], (tx, results) => {


        var len = results.rows.length;

        let row = results.rows.item(0);

         console.log(row)

        dispatch(addSetting(row))

        dispatch(QuestionMode(row.Question))



      },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <ImageBackground style={{ flex: 1 }} source={require('../../Assets4/bgnewcategory.png')}>
      <Header onPress2={() => setMute(!mute)} mute={mute} onPress3={() => setVisible(true)} onPress={() => Navigation.navigate('setting', { pr: 'home' })} home />
      <HorizontalList items={MyData} />
    </ImageBackground>
    <Modal
            animationType="none"
            transparent={true}
             visible={visible}
            >
          <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enjoy an Ad-Free Experience with Multi-tasking!</Text>
                    <Text style={styles.modalText1}>Get Ad-Free version for absolutely un-interrupted Play and learn experience for your child!</Text>
                    <Text style={styles.modalText1}>Start Where you left without having to view splash screen again - The upgrade supports multi-tasking.</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                                onPress={()=>setVisible(false)}>
                            <Text style={styles.textStyle}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>setVisible(false)}
                            style={[styles.button, styles.buttonClose]}>
                    

                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    <View style={{alignItems:'center'}}>
      <BannerAd 
      size                                   ={BannerAdSize.BANNER}
      requestOptions={{requestNonPersonalizedAdsOnly:true}}
      unitId={adUnitId}/>
    </View>
    </SafeAreaView>
  )
}

export default Home

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
