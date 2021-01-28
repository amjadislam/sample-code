import React,{Component} from "react";
import { StyleSheet, Text, View, Dimensions, BackHandler,
    ToastAndroid, } from 'react-native';
import MapView from 'react-native-maps';
import SurahScreenBg, {SurahScreenVerseBg} from "./SurahScreenBg";
import DefaultBg from "../compnenets/DefaultBg";

import BottomButtonBg from "../compnenets/locationScreen/BottomButtonBg";
import LocationView from "../compnenets/locationScreen/LocationView";
import SetLocationDate from "../compnenets/homeScreen/SetLocationDate";
import {inject, observer} from "mobx-react";
import CommonDataManager from "../util/CommonDataManager";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

@inject('userStore')
@observer
class LocationScreen extends Component{

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {

        if(!CommonDataManager.getInstance().isLocationSet()){
            return true;
        }else{
            return false
        }


    }

    constructor(props) {
        super(props);


    }


    render() {

        //this.props?.onLocationUpdate?.()

        return (

            <DefaultBg>

                <View style={styles.container}>


                    {/*<SetLocationDate navigation={this.props.navigation}/>*/}

                    {/*AIzaSyCLV8JoB0-QiyC0cNPhiO00L4FrWMxyXuE*/}

                    <SetLocationDate
                        {...this.props}
                        navigation={this.props.navigation}/>
                   <LocationView

                       {...this.props}
                       apiKey={'AIzaSyCLV8JoB0-QiyC0cNPhiO00L4FrWMxyXuE'}
                       initialLocation={
                           {
                               latitude:this.props.userStore?.userLocation?.coords?.latitude,
                               longitude: this.props.userStore?.userLocation?.coords?.longitude,
                           }
                       }/>



                    {/*<View style={styles.mapContainer}>

                        <MapView style={styles.mapStyle} >
                            <MapView.Marker
                                coordinate={{ "latitude": -23.548670,
                                    "longitude":-46.638248}}
                                title={"Your Location"}
                                draggable >
                                <View style={styles.circle}>

                                </View>
                            </MapView.Marker>





                        </MapView>
                        <BottomButtonBg/>

                    </View>*/}
                </View>

            </DefaultBg>

        );
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    mapContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25,
        overflow: 'hidden',
        flexDirection: 'column'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 30 / 2,
        backgroundColor: 'green',
    },
    pinText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
});

export default LocationScreen;
