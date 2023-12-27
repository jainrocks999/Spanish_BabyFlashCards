import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {height, width} from './Diemenstions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Switch = ({style, text, isSetting, sw, onPress, ...props}) => {
  const [TogleSwitch, setTougleSwit] = useState(false);

  return (
    <View style={{flexDirection: 'row', margin: '2%'}}>
      <View style={{width: '60%'}}>
        <Text style={style}>{text} :</Text>
      </View>
      <TouchableOpacity {...props} onPress={onPress} style={styles.pressable}>
        {isSetting === undefined && (
          <Image
            style={styles.pre}
            source={
              sw
                ? require('../../Assets4/on.png')
                : require('../../Assets4/off.png')
            }
            resizeMode="contain"
          />
        )}
        {isSetting && (
          <Image
            style={styles.pre}
            source={
              sw
                ? require('../../Assets4/on1.png')
                : require('../../Assets4/off1.png')
            }
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Switch;
const styles = StyleSheet.create({
  pressable: {
    // height:height*0.080,
    // width:width/3,
    // borderWidth:1,
    marginLeft: '1%',
  },
  pre: {
    height: wp('8%'),
    width: wp('14%'),
  },
});
