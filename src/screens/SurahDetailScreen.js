import React,{Component} from "react";

import {StyleSheet, Text, View,FlatList,SafeAreaView,ScrollView} from "react-native";
import DefaultBg from "../compnenets/DefaultBg";

import SurahScreenBg, {SurahScreenVerseBg} from "./SurahScreenBg";
import SurahListAdapter from "../compnenets/surahScreen/SurahListAdapter";
import SurahDetailHeader from "../compnenets/surahScreen/SurahDetailHeader";
import SurahDetailTitle from "../compnenets/surahScreen/SurahDetailTitle";
import VerseNumberCell from "../compnenets/surahScreen/VerseNumberCell";
import BlueBGCell from "../compnenets/surahScreen/BlueBGCell";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import {inject, observer} from "mobx-react";
import Versus from "../stores/models/Versus";
import SurahDetailRow from "../compnenets/surahScreen/SurahDetailRow";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


@inject('userStore')
@observer
class SurahDetailScreen extends Component{


    state = {

        versusGroup:[] = []

        }

    surahNumber = 0
    surahTitle = ''

    constructor(props) {
        super(props);
        this.surahNumber = this.props.route.params.surahNumber
        this.surahTitle = this.props.route.params.surahTitle
        this.getVersusData(this.props.userStore.versusList,this.surahNumber)
    }

    render() {
     return(

             <DefaultBg>
                 <View style={styles.container}>
                 <SetLocationDate
                     {...this.props}
                    navigation={this.props.navigation}/>
                    <SurahScreenBg>
                        <SurahDetailHeader   {...this.props} surahTitle ={this.surahTitle}/>
                     <FlatList
                         style={{flex:1,marginTop:10}}
                         data={this.state.versusGroup}
                         renderItem={({item}) =>{

                             return (
                                 <SurahDetailRow versus ={item}/>
                             )
                         }}

                     />

                    </SurahScreenBg>

                 </View>
             </DefaultBg>



     );

    }





    getVersusData = (versus:[] , surahNumber) => {

         this.state.versusGroup = []
        let versFound = false

        for(let vers of versus){
            if(vers.surah_no == surahNumber){
                versFound = true
                this.state.versusGroup.push(vers)
            }else if(versFound && vers.surah_no != surahNumber){
                break
            }

        }


        return this.state.versusGroup
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default SurahDetailScreen;
