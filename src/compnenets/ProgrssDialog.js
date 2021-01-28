



import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

class ProgrssDialog extends Component {


    state = {
        animating: true,
        progressBg: 'transparent'

    }

    barColor


    constructor(props) {
        super(props);
        this.state.animating = props.animating
        this.barColor =  props.barColor
    }

    static getDerivedStateFromProps(props, current_state){

        if(current_state.animating !== props.animating){
            let bgColor:'transparent'
            if(props.animating == true)
                bgColor = 'rgba(52, 52, 52, 0.5)'
            else
                bgColor = 'transparent'

            return {
                animating: props.animating,
                progressBg : bgColor,
            }

        }

        return null
    }


    render() {

        return (
            <View pointerEvents="none" style={{ flex: 1,
                width:wp('100%'),
                height:hp('100%'),
                justifyContent: "center",
                backgroundColor:this.state.progressBg,
                alignItems: 'center'}}>

                <ActivityIndicator
                    animating = {this.state.animating}
                    color = {this.barColor}
                    size = "large"
                    style = {styles.activityIndicator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:wp('100%'),
        height:hp('100%'),
        justifyContent: "center",

        alignItems: 'center'

    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});

export default ProgrssDialog;
