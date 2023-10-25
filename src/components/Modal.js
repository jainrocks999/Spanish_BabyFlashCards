import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const App = ({vis}) => {

    const Navigation = useNavigation()
    const [visible,setVisible]=useState(vis)
    return (
        <View style={{flex:1}}>
       
        </View>

    );
};

const styles = StyleSheet.create({
   
});

export default App;