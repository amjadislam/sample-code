import React,{Component} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from "i18n-js";


class SurahDetailHeader extends Component{


    state = {

        surahTitle: ''

    }

    constructor(props) {
        super(props);
        this.state.surahTitle = props.surahTitle
    }

    static getDerivedStateFromProps(props, current_state){

        if(current_state.surahTitle !== props.surahTitle){

            return {
                surahTitle: props.surahTitle,
            }

        }

        return null
    }


    render() {
        return(
          <View style = {Styles.container}>
              <Text style={Styles.surahListTitle}>{this.state.surahTitle}</Text>

              <TouchableOpacity o onPress={() => {

                  this.props.navigation.pop();
                  return false;

              }}>

                  <View>
                      <LinearGradient
                          // Button Linear Gradient
                          colors={['#2DAA37', '#86BD25']}
                          locations={[0.2, 1.0]}
                          style={Styles.backButtonBg}
                      >
                          <Image source={require('../../../assets/back_arrow.png')}
                                 style = {Styles.backButton}/>
                          <Text style={{color:'white'}}>{i18n.t('back_to_list')}</Text>
                      </LinearGradient>
                  </View>
              </TouchableOpacity>

          </View>

        );
    }


}

const Styles = StyleSheet.create({
    container: {

        alignSelf: 'stretch',
        flexDirection:"row",
        alignItems:"center",
        marginTop:10
    },

    surahListTitle: {
        flex:1,
        fontSize:22,
        color:'#03A63C',

    },

    backButtonBg: {
        flexDirection: 'row',
        fontSize:15,
        color:'white',
        padding: 10,
        borderRadius:17,



    },
    backButton: {
        width: 20,
        height:20,
        fontSize:15,
        marginRight:10,
        color:'white',
        padding: 10,



    },
});

export default SurahDetailHeader;


