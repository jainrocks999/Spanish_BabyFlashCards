import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['spanish_in_ads_purchase'],
  ios: ['com.eflashapps.eflashspanish.proupgrade'],
});
export const constants = {
  productSkus,
};
