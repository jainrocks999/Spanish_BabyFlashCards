import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, BackHandler, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { height, width } from '../components/Diemenstions';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer } from '../components/Setup';
import { } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StackActions, useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addCat } from '../reduxToolkit/Slice5';



import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
const adUnitId =  TestIds.INTERSTITIAL;
  
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
const Detials = (props) => {

    

    useEffect(() => {
        const interval = setInterval(() => {
          
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            interstitial.show();
        });
        // Start loading the interstitial straight away
        interstitial.load();
        // Unsubscribe from events on unmount 
        return unsubscribe;
     }, 30000);
          return () => clearInterval(interval);

    }, []);
    console.log(documentsPath)
    const disapatch = useDispatch();
    const documentsPath = Platform.OS === 'android' ? 'asset:/files/' : RNFS.MainBundlePath + '/files/'

    useEffect(() => {
        const backAction = async () => {
            await TrackPlayer.reset()
            navigation.dispatch(StackActions.popToTop())  
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const [Images, setImages] = useState('')
    const [Title, setTitle] = useState();
    const [count, setCount] = useState(0);
    const [Music, setMusic] = useState();
    const [Word, setWord] = useState();
    const navigation = useNavigation();
    useEffect(() => {
        getData()

    }, [count])

    const setting = useSelector(state => state.setting)


    useEffect(() => {
        setupPlayer()
    }, [Music])
    const cat = useSelector(state => state.cat)
    var data;
    if (!setting.RandomOrder) {
        data = useSelector(state => state.Items.filter(item => item.Category === cat.Category))
    }
    else {
        data = useSelector(state => state.Items.filter(item => item.Category === cat.Category).sort(() => Math.random() - 0.5))

    }


    const getData = async () => {

        let isSetup = await setupPlayer()
        await TrackPlayer.reset()
        let Imagess;
        let Titel;
        let track;
        let track2;
        let ActualSound;
        let Word;
        let y = data.length
        if (count >= 0 && count <= y - 1) {
            data.map(async (item, index) => {
           

                if (index == count) {
 
                    Imagess = documentsPath + item.Image
                    Titel = item.Title
                    Word = item.Word
                    track = {
                        url: documentsPath + item.Sound, // Load media from the file system
                        title: 'Ice Age',
                        artist: 'deadmau5',
                        // Load artwork from the file system:
                        artwork: `asset:/files/${item.Sound}`, //ActualSound
                        duration: null
                    };
                    track2 = {
                        url: documentsPath + item.ActualSound, // Load media from the file system
                        title: 'Ice Age',
                        artist: 'deadmau5',
                        // Load artwork from the file system:
                        artwork: `asset:/files/${item.Sound}`,
                        duration: null
                    };
                    if(item.ActualSound!=1){
                    ActualSound=item.ActualSound
                    }
                  
                }
            })
        }
        else if (count < 0) {
            navigation.goBack()
        }
        else {
            //    // navigation.dispatch(StackActions.popToTop())
            //    disapatch(addCat('ArtMusic'))
            //    setCount(0)

            navigation.dispatch(StackActions.replace('next'))


        }
        setImages(Imagess)
        setTitle(Titel)
        setWord(Word)
        if (ActualSound && setting.ActualVoice && setting.Voice) {
            setMusic([track2, track])
        }
        else if (ActualSound && setting.ActualVoice) {
            setMusic(track2)
        }
        else {
            setMusic(track)
        }
        if (isSetup) {
            if (ActualSound && setting.ActualVoice && setting.Voice) {
                await TrackPlayer.add([track2, track])
            }
            else if (ActualSound && setting.ActualVoice) {
                await TrackPlayer.add(track2)
            }
            else if (setting.Voice) {
                await TrackPlayer.add(track)
            }

        }
        await TrackPlayer.play()

    }
    const paly = async () => {
        await TrackPlayer.reset()
        await TrackPlayer.add(Music)
        await TrackPlayer.play()

    }




    return (
        <GestureRecognizer style={{ flex: 1 }}
            onSwipeLeft={() => setting.Swipe && setCount(count + 1)}
            onSwipeRight={() => setting.Swipe && setCount(count - 1)}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={async () => { await TrackPlayer.reset(),navigation.dispatch(StackActions.popToTop ()) }}><Image style={styles.icon} source={require('../../Assets4/btnhome_normal.png')} /></TouchableOpacity>
                        <Text style={styles.Titel}>{setting.English && Title}</Text>
                        <Text style={styles.Word}>{setting.English && Word}</Text>
                        <TouchableOpacity onPress={async () => { await TrackPlayer.reset(), navigation.dispatch(StackActions.push('setting', { pr:'details', })) }}><Image style={styles.icon} source={require('../../Assets4/btnsetting_normal.png')} /></TouchableOpacity>
                    </View>
                    <View style={styles.imgContainer}>
                        {Images && <Image style={{ height: '100%', width: '100%', alignItems: 'center', resizeMode: 'contain' }} source={{ uri: Images }} />
                        }
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={[styles.btn]}>
                            {!setting.Swipe && count > 0 && <TouchableOpacity onPress={async () => { setCount(count - 1) }}><Image style={styles.btn} source={require('../../Assets4/btnprevious_normal.png')} /></TouchableOpacity>}
                        </View>

                        <TouchableOpacity onPress={() => { paly() }}><Image style={[styles.btn2, ]} source={require('../../Assets4/btnrepeat_normal.png')} /></TouchableOpacity>
                        <View style={styles.btn}>
                            {!setting.Swipe && <TouchableOpacity onPress={async () => { setCount(count + 1) }}><Image style={styles.btn} source={require('../../Assets4/btnnext_normal.png')} /></TouchableOpacity>}

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </GestureRecognizer>
    )

}
export default Detials

const styles = StyleSheet.create({
    header: {
        height: height / 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey'
    },
    icon: {
        height: height / 14,
        width: width / 7,
        margin: '1%'
    },
    Titel: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    Word: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',


    },
    imgContainer: {
        //marginTop: '-25%',
        borderWidth: 1,
        height: '85%'

    },
    btnContainer: {
        position: 'absolute',
        bottom: "9%",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btn: {
        height: height / 21,
        width: width / 3,
        margin: "1%"
    },
    btn2: {
        height: height / 17,
        width: width / 8.6,
        margin: "1%"
    }

})