import { StyleSheet, Text, View, AppState } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyStack from './src/components/MyStack'
import { Provider } from 'react-redux'
import myStore from './src/reduxToolkit/MyStore'
import TrackPlayer, { usePlaybackState } from "react-native-track-player"



const App = () => {
  return (
    <Provider store={myStore}>
      <MyStack />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})