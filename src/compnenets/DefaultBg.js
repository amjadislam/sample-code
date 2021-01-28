import React, {Component} from "react";
import {StyleSheet, Image, Dimensions, View} from "react-native";

const DefaultBg = props => {

  return (
    <View style={Styles.bottomImageStyle}>
      <Image
        source={require('../../assets/app_bg.png')}
        style={Styles.bottomImageStyle}
      />
      {props.children}
    </View>
  );
}

const Styles = StyleSheet.create({
  bottomImageStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignSelf: 'stretch',
    position: 'absolute',
  },
});

export default DefaultBg;


