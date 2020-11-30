import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';

export default BotonCustom = ({ onPress, title, style , styletext}) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer , style]}>
      <Text style={[styles.appButtonText , styletext]}>{title}</Text>
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
screenContainer: {
  flex: 1,
  justifyContent: "center",
  padding: 16
},
appButtonContainer: {
  elevation: 8,
  backgroundColor: "#D8BD39",
  borderRadius: 10,
  ...Platform.select({
    'ios':{
      paddingVertical: 15,
      paddingHorizontal: 15, 

    },
    'android':{
      paddingVertical: 12,
    
      
    }
  })
},
appButtonText: {
  
  color: "#000",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase",
  ...Platform.select({
    'ios':{
      fontSize: 20,
    },
    'andriod':{
      fontSize: 15,
    }
  })
}
});

