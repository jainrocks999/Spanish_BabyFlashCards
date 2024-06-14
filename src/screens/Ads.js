import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';
export default {
  ...Platform.select({
    android: {
      interstitial: TestIds.INTERSTITIAL, //'ca-app-pub-3339897183017333/8255680786',
      BANNER: TestIds.BANNER, //'ca-app-pub-3339897183017333/1430417985',
    },
    ios: {
      interstitial: 'ca-app-pub-3339897183017333/1830401987',
      BANNER: 'ca-app-pub-3339897183017333/8953684787',
    },
  }),
};

//intn //
//Banner
