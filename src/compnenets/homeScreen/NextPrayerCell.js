import React, {Component} from "react";
import {StyleSheet, View, Image, Text, ToastAndroid} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import PrayerTimeCell from "./PrayerTimeCell";
import CountDown from "../../util/CountDown";
import LocationOrDateCell from "./LocationOrDateCell";

class NextPrayerCell extends Component {

  state = {
    icon: '',

    nextPrayer: '',
    nextPrayerMinutes:0,
    counterID:'',
  }

  constructor(props) {
    super(props);
    this.state.icon = props.icon;
    this.state.nextPrayer = props.nextPrayer;
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.nextPrayerMinutes !== props.nextPrayerMinutes) {
      console.log("nextPrayerMinutes",props.nextPrayerMinutes)
      return {
        nextPrayerMinutes: props.nextPrayerMinutes,
        counterID: ""+props.nextPrayerMinutes,
      }
    }
    if (current_state.nextPrayer !== props.nextPrayer) {
      console.log("nextPrayerMinutes",props.nextPrayerMinutes)
      return {
        nextPrayer:props.nextPrayer,
        icon:props.icon
      }
    }
    if (current_state.icon !== props.icon) {
      console.log("nextPrayerMinutes",props.nextPrayerMinutes)
      return {
        icon:props.icon
      }
    }
    return null
  }

  render() {
console.log(this.state.nextPrayerMinutes)
    return (
      <View style={{alignItems: 'center'}}>
        <View style={Styles.cellBg}>
          <Image
            source={this.state.icon}
            style={Styles.nextPrayerCellIcon}
          />
          <View style={Styles.nextPrayerCellTime}>



            <CountDown
                {...this.props}
                id={this.state.counterID}
                until={(this.state.nextPrayerMinutes)}
                onFinish={() => {
                  //ToastAndroid.show("onNextPrayerTimeComplete", ToastAndroid.SHORT)
                  this.props.onNextPrayerTimeComplete()}}
                onPress={() => {}}
                separatorStyle={{color: 'black'}}
                size={35}
                digitStyle={{backgroundColor: '#FFF',}}
                digitTxtStyle={{color: 'black'}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: '', s: ''}}
                showSeparator
            />

            <Text style={{fontSize: wp('4%'), marginStart: 10}}>{this.state.nextPrayer}</Text>

          </View>
        </View>
      </View>
    );
  }
}

export function SetPrayerCell(props) {
  return (
    <View style={Styles.prayerCell}>
      <PrayerTimeCell icon={props.icon}
                      prayerName={props.prayerName} prayerTime={props.prayerTime}/>
    </View>
  );

}

export default NextPrayerCell;

const Styles = StyleSheet.create({
  cellBg: {
    flexDirection: 'row',
    width: wp('90%'),
    height: wp('30%'),
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  nextPrayerCellIcon: {
    width: wp('15%'),
    height: wp('15%'),
    margin: wp('5%'),
    resizeMode: 'stretch',
  },
  nextPrayerCellTime: {
    flex: 1,
    resizeMode: 'stretch',
    flexDirection: 'column',

  },
  prayerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
