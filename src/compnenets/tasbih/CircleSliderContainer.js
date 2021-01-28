import React, { Component } from "react";
import {StyleSheet, View,Text,TouchableOpacity,ToastAndroid} from "react-native";

import SurahListRow from "../surahScreen/SurahListRow";
import CircularProgress from "./CircularProgress";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";



0

export default class CircleSliderContainer extends Component {
    state = {
        sliderValue : 0,
        fillColor : 'red',
        startAngle:60,
        angleLength:10,
    }


     onValueChangeC(x){
         //ToastAndroid.show("test", ToastAndroid.SHORT)
    }


    render() {

        return (
            <View style={{ flexDirection:'column',flex: 1, justifyContent: "center", alignItems: "center", marginTop: -hp('10%') }}>

                <CircularProgress
                    percent={this.state.sliderValue}
                    radius={wp('40%')}
                    borderWidth={15}
                    color={"#FFDA45"}
                    shadowColor={"#999"}
                    bgColor={"#fff"}
                >
                    <Text style={{ fontSize: 18 }}>{}</Text>
                </CircularProgress>
                <TouchableOpacity style ={styles.innerCircle} onPress={this.onTapCircle}>

                    <View style ={styles.innerCircleText}>
                        <Text style ={{fontSize: 40,color:'#03A63C'}}>{this.state.sliderValue}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    onTapCircle =()=>{

    let value  = this.state.sliderValue + 1;
    if(value==100) {
        this.state.sliderValue = 0;
        value = 0;
    }

    let color = 'green';

    console.log("slider value ", this.state.sliderValue);
    this.setState({sliderValue: value, fillColor: color},()=>{
            console.log("slider value update ", this.state.sliderValue);
        })

    }
}

const styles = StyleSheet.create({

    innerCircle: {
        position:'absolute',
        width:250,
        height:250,
        borderRadius:125,

    },innerCircleText: {
        position:'absolute',
        width:250,
        height:250,
        borderRadius:125,


        fontSize:30,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'

    },
});
