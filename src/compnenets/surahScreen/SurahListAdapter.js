import React, {Component} from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import SurahListRow from "./SurahListRow";
import SurahScreenBg from "../../screens/SurahScreenBg";
import i18n from "i18n-js";

class SurahListAdapter extends Component {

    state = {
        surahsListing: []
    }

    constructor(props) {
        super(props);
        this.state.surahsListing = props.surahsListing
    }

    static getDerivedStateFromProps(props, current_state){

        if(current_state.surahsListing !== props.surahsListing){

            return {
                surahsListing: props.surahsListing,
            }

        }

        return null
    }


  render() {

        console.log("SuranhList render",this.state.surahsListing)
    return (
      <SurahScreenBg>

        <Text style={Styles.surahListTitle}>{i18n.t('surahs_list')}</Text>

        <FlatList
          style={Styles.surahListStyle}
          data={this.state.surahsListing}
          renderItem={({item}) => {
            const {number, name, englishName, numberOfAyahs} = item;

            return (
              <TouchableOpacity onPress={() => {
                console.log("props ", this.props.navigation)
                this.props.navigation.navigate('SurahDetailScreen',{surahNumber:number,surahTitle:englishName});
              }}>
                <SurahListRow
                  number={number}
                  engTitle={englishName}
                  arTitle={name}
                  versusCount={numberOfAyahs}
                />
              </TouchableOpacity>
            );
          }}
        />

      </SurahScreenBg>
    );
  }

  onPressItem() {
    console.log("props navigation", this.props.navigation)
  }


}

const Styles = StyleSheet.create({

  surahListStyle: {
    position: 'relative',
  },
  surahListTitle: {
    margin: 15,
    fontSize: 25,
    color: '#03A63C',
    alignSelf: 'flex-start',
    position: 'relative',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});

export default SurahListAdapter;
