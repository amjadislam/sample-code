import React, {Component} from "react";
import {TouchableOpacity, View, ToastAndroid, Text} from "react-native";
import PreferencesStorage from "../../util/PreferencesStorage";
import {PREF_CONSTANTS} from "../../stores/Constants";
import LocationOrDateCell from "./LocationOrDateCell";
import i18n from "i18n-js";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import BlueBGCell from "../surahScreen/BlueBGCell";
import {SurahScreenVerseBg} from "../../screens/SurahScreenBg";



export default class SetLocationDate extends Component{

    navigation
    state = {
        address:'--',
        currentDate: '--',
        islamicDate: '--',
        title:''
    }





    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state.title = props.title;

    }
    componentDidMount() {


        PreferencesStorage.getData(PREF_CONSTANTS.USER_ADDRESS)
            .then(code => {

                this.setState({ address:code },() => {
                    console.log('State ',this.state.address);
                });

            });


    }

    _onLocationUpdate(address){

        this.setState({address:address})
        this.props?.onLocationUpdate?.(address)


    }


    render() {

        // console.log('State render',this.state.address);
        return(


            <View style ={{flexDirection:'column', zIndex:999,
            justifyContent:'center',alignItems:'center',
            paddingTop: hp('6%')
              }}>

                {this.state.title?.length > 0 && (
                    <>
                        <Text style={{fontSize:25,color:'white'}}>
                            {this.state.title}
                        </Text>
                    </>
                )}


            <View style ={{flexDirection:'row', zIndex:999,
            justifyContent:'center',alignItems:'center',
                paddingTop: hp('2%'),
            }}>
                <TouchableOpacity  onPress={()=>{
                    this.navigation.navigate('Location',{
                            onLocationUpdate: this._onLocationUpdate.bind(this)

                    })
                }}>
                    <LocationOrDateCell {...this.props}
                                        icon ={require('../../../assets/icon_location.png')}
                                        title = {this.state.address} data = {i18n.t('change_location')}

                    />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{
                    this.navigation.navigate('Setting')
                }}>
                    <LocationOrDateCell icon ={require('../../../assets/icon_setting.png')}
                                        title = {this.props.userStore.date}
                                        data = {this.props.userStore.islamicDate}/>
                </TouchableOpacity>
            </View>
            </View>
        );
    }

}
