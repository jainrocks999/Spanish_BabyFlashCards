import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from './Diemenstions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Card = ({item, onPress}) => {
  //const path = require('../../assets/1.jpg')

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        item?.Category == 'More' || item?.Category == 'Review'
          ? {height: hp(22), width: wp(45)}
          : {height: hp(20)},
      ]}
      activeOpacity={0.8}>
      <Image
        style={{height: '100%', width: '100%'}}
        resizeMode="contain"
        source={item.Image}
      />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: hp(20),
    width: wp(45),
    margin: '2%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
