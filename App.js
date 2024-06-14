import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import myStore from './src/reduxToolkit/MyStore';
import IAPProvider from './src/Context';
import Root from './src';
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={myStore}>
      <IAPProvider>
        <StatusBar backgroundColor="#73cbea" />
        <Root />
      </IAPProvider>
    </Provider>
  );
};

export default App;
