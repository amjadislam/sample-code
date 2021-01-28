import React, {Component} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

class PrayerTimeCell extends Component {

  render() {
    const {icon, prayerName, prayerTime} = this.props;

    return (
      <View style={Styles.prayerCellBg}>
        <Image
          source={icon}
          style={Styles.prayerCellIcon}
        />
        <Text style={{fontSize: 20,textAlign: 'center'}}>{prayerName}</Text>
        <Text style={{fontSize: 30}}>{prayerTime}</Text>
      </View>
    );

  }
}

const Styles = StyleSheet.create({
  prayerCellBg: {

    width:wp('33%'),
    height:hp('17%'),
    borderRadius: 15,
    padding:5,
    backgroundColor: '#FFDA45',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',

  },
  prayerCellIcon: {
    top: -10,
    width:hp('4.3%'),
    height:hp('4.3%'),
    resizeMode: 'stretch',
    position: 'absolute',
  },
});

export default PrayerTimeCell;
