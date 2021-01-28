import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import i18n from "i18n-js";



class BottomButtonBg extends Component{

    render() {
        return (
          <View   style={Styles.bottomButtonBg}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#2DAA37', '#86BD25']}
                  locations={[0.2, 1.0]}
                  style={Styles.bottomButtonBg}
              >

                  <View  style={Styles.pickLocationButton}>

                      <Text style ={{fontSize:18}}>{i18n.t('pick_location')}</Text>
                  </View>


              </LinearGradient>
          </View>
        );

    }
}


const Styles = StyleSheet.create({

    bottomButtonBg: {
        flex:1,
        height:120,
        width:wp('100%'),
        flexDirection: 'row',
        fontSize: 15,
        position: 'absolute',
        padding: 10,
        bottom:60,
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent:'center',
        resizeMode: 'stretch',

    },
    pickLocationButton: {

        width:wp('85%'),
        fontSize: 15,
        backgroundColor:'#FFDA45',
        borderRadius:5,
        marginBottom:15,
        padding: 10,
        justifyContent:'center',
        alignItems: 'center'

    }
});

export default BottomButtonBg;
