import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

class SurahNumberCell extends Component {

  render() {
    return (
      <View style={Styles.surahNumberCellBg}>
        <Text style={{fontSize: 25}}>{this.props.number}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  surahNumberCellBg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFDA45',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
});

export default SurahNumberCell;
