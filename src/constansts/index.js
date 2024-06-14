import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['spanish_in_ads_purchase'],
});
export const constants = {
  productSkus,
};
