import { View, Text ,AppState} from 'react-native'
import React,{useEffect,useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Detials from '../screens/Detials'
import QuestionPage from '../screens/QuestionPage'
import SettingScreen from '../screens/SettingScreen'
import SplashScreen from '../screens/SplashScreen'
import Modal from '../components/Modal'
import NextScreen from '../screens/NextScreen'
import { useSelector } from 'react-redux'
import { setupPlayer } from './Setup'
import TrackPlayer from 'react-native-track-player'
import InterstitialAdsScreen from '../screens/Ads/interstital'
const Stack=createStackNavigator()

const MyStack = ({mute}) => {
  const ismuted=useSelector(state=>state.sound)


  

let  track={
    
      url: require('../../asset2/babyflashtheme.mp3'), // Load media from the file system  //
      title: 'Ice Age',
      artist: 'deadmau5',
      // Load artwork from the file system:
      //artwork: `asset:/files/${item.Sound}`,
      duration: null
    
  }
 
console.log(track);
  const [appState, setAppState] = useState(AppState.currentState);
  console.log('from my sta',ismuted);

  useEffect(() => {

   

    const onAppStateChange = async (nextAppState) => {
      await setupPlayer()


      if (
        appState.match(/active|foreground/) &&
        nextAppState === 'background'
      ) {
        
       await TrackPlayer.pause();
      }

      if (
    
        appState.match(/background/) &&
        nextAppState === 'active'
      ) {
       mute&& await TrackPlayer.play();
        console.log('forground');
      }

      setAppState(nextAppState);
    };

    AppState.addEventListener('change', onAppStateChange);

    
  }, [appState]);
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='slash'>
            <Stack.Screen name='home' component={Home}/>
            <Stack.Screen name='details' component={Detials}/>
            <Stack.Screen name='question' component={QuestionPage}/>
            <Stack.Screen name='setting' component={SettingScreen}/>
            <Stack.Screen name='slash' component={SplashScreen}/>
            <Stack.Screen name='next' component={NextScreen}/>
            <Stack.Screen name='Modal' component={Modal}/>
            <Stack.Screen name='InterstitialAdsScreen' component={InterstitialAdsScreen}/>
           
        
          
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack