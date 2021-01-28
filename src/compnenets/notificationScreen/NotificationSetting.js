import React, {Component, useState} from "react";
import {StyleSheet,Image, Text,View,Switch,ToastAndroid} from "react-native";
import {SurahScreenVerseBg} from "../../screens/SurahScreenBg";
import CustomSwitch from "./SwitchComponent";
import {Constants} from "expo/build/removed.web";
import {PREF_CONSTANTS} from "../../stores/Constants";
import PreferencesStorage from "../../util/PreferencesStorage";
import {inject, observer} from "mobx-react";


@inject('userStore')
@observer
class NotificationSetting extends Component{



    state ={

        icon:'',
        prayerName:'',
        isSelected:false,
        prayerHours:0,
        prayerMinutes:0,
        index :0,
        prayerPrefID:'',

    }




    constructor(props) {
        super(props);
        this.icon = props.icon;
        this.prayerName = props.prayerName;
        this.state.index = props.index
        this.prayerPrefID = props.prayerPrefID


    }


    componentDidMount() {

        PreferencesStorage.getData(this.prayerPrefID).then(identifier => {

            if(identifier.trim().length>0) {
                this.setState({isSelected:true})
            }else {
                this.setState({isSelected:false})
            }
        });


    }


    render() {

        return(
            <View style={styles.container}>

                <SurahScreenVerseBg>
                    <View style={styles.switchContainer}>
                        <Image style={styles.prayerIcon} source={this.icon}/>
                        <Text style ={styles.prayerName}>{this.prayerName}</Text>
                        <CustomSwitch
                            {...this.props}
                            prayerName={this.prayerName}
                            isSelected={this.state.isSelected}
                            prayerHours = {this.state.prayerHours}
                            prayerMinutes = {this.state.prayerMinutes}
                            index = {this.state.index}
                            prayerPrefID  = {this.prayerPrefID}


                        />
                    </View>
                </SurahScreenVerseBg>



            </View>

        );

    }

}



const styles = StyleSheet.create({
    container: {

        marginTop:10,

    },
    prayerIcon: {
        width:50,
        height:50,
        marginEnd:10,

    },
    prayerName: {
        flex: 1,
        fontSize:20,
        alignItems: 'flex-start',
        justifyContent:'center'
    },
    switchContainer: {
        flexDirection:'row',
        flex: 1,
        padding:10,
        alignItems:'center',


    },

});

export default NotificationSetting;


