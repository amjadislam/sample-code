import React, {Component} from "react";
import {StyleSheet, Text, ToastAndroid, View} from "react-native";
import VerseNumberCell from "./VerseNumberCell";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import SurahNumberCell from "./SurahNumberCell";
import {SurahScreenVerseBg} from "../../screens/SurahScreenBg";

class SurahListRow extends Component {

  render() {
    const {engTitle, arTitle, versusCount, number} = this.props;
    return (
      <SurahScreenVerseBg>
        <SurahNumberCell number={''+number}/>
        <View style={{flexDirection: 'column', flex: 1, paddingStart: 10}}>
          <Text style={{fontSize: 20}}>{engTitle}</Text>
          <Text style={{fontSize: 10, textAlign: 'left'}}>{arTitle}</Text>
        </View>
        <VerseNumberCell title={`${versusCount} versus`}/>
      </SurahScreenVerseBg>
    );
  }
}

const Styles = StyleSheet.create({
  surahListRow: {
    flexDirection: 'row',
    width: wp('90%'),
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#F9F9FC',
    padding: 10,
    alignItems: 'center',
    resizeMode: 'stretch',
  },
});

export default SurahListRow;
