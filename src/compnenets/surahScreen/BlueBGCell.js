import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";



class BlueBGCell extends Component{

    title;

   constructor(props) {
        super(props);
        this.title = props.title;
    }

    render() {
        return (
            <View style={Styles.verseNumberCellBg}>

                <Text style ={{fontSize:15,color:'white'}}>{this.title}</Text>

            </View>
        );

    }
}

const Styles = StyleSheet.create({
    verseNumberCellBg: {

        padding:15,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        backgroundColor:'#023373',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'baseline'


    },
});


export default BlueBGCell;
