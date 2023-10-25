import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from './Diemenstions'
import TrackPlayer from 'react-native-track-player'
import { setupPlayer } from './Setup'
import { useDispatch, useSelector } from 'react-redux'
import { Sound } from '../reduxToolkit/Slice4'
import { useIsFocused } from '@react-navigation/native'

const Header = ({ onPress, onPress2,onPress3, mute, home }) => {
  const isFocused=useIsFocused()
  
  useEffect(() => {
    play()
  }, [mute])
  const dispatch = useDispatch()

  const mt=useSelector(state=>state.sound)

  const play = async () => {
    isReady = await setupPlayer()
    await TrackPlayer.reset()
    let track = {
      url: require('../../asset2/babyflashtheme.mp3'), // Load media from the file system
      title: 'Ice Age',
      artist: 'deadmau5',
      // Load artwork from the file system:
      //artwork: `asset:/files/${item.Sound}`,
      duration: null
    };
    if (isReady) {
      await TrackPlayer.add(track)
     mute && await TrackPlayer.play()
    }

    dispatch(Sound(mute))
  }

  return (
    <View style={{ height: height / 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={onPress2}><Image style={{ height: height / 14, width: width / 7, margin: '1%' }} source={mt ? require('../../Assets4/btnsseakar.png') : require('../../Assets4/btnspeakarcancel.png')} /></TouchableOpacity>
      {home &&<TouchableOpacity onPress={onPress3}><Image style={{ height:50, width:180,  }} source={require('../../Assets4/btnupgrade.png')} /></TouchableOpacity>}
      {home && <TouchableOpacity onPress={onPress}><Image style={{ height: height / 14, width: width / 7, margin: '1%', }} source={require('../../Assets4/btnsetting_normal.png')} /></TouchableOpacity>}
    </View>
  )
}

export default Header