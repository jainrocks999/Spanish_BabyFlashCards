import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { BannerAd,TestIds,BannerAdSize,InterstitialAd, } from 'react-native-google-mobile-ads';
import Card from './Card'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCat } from '../reduxToolkit/Slice5'
const HorizontalList = ({ items }) => {
    var interstitial;
React.useEffect(() => {
      const unsubscribe = interstitial?.addAdEventListener(AdEventType.LOADED, () => {
      interstitial?.show();
      });
      // Start loading the interstitial straight away
      interstitial?.load();
      // Unsubscribe from events on unmount
      return unsubscribe;
  }, [interstitial]);
  const onBannerAdsPress=()=>{
    navigation.navigate(wr?'question':'details')
  }
    const disapatch=useDispatch()
    
    const goTo=(cat,index)=>{
        let catdata={
            Category:cat.Category,
            index:index
        }
        onBannerAdsPress(cat,index)
       
        disapatch(addCat(catdata))
    }
    const wr=useSelector(state=>state.question)
    const navigation=useNavigation()
    return (
        <View style={{flex:1,alignItems:"center",alignSelf:'center',width:'100%'}}>
        <FlatList
            scrollEnabled={true}
            numColumns={2}
            data={items}
            keyExtractor={item=>item.id}
            renderItem={({ item,index }) => {
                return (
                    <Card onPress={()=>{goTo(item,index)}} item={item} />
                )
            }}

        />
        </View>
    )
}

export default HorizontalList