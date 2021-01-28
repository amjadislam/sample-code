import React from 'react';
import PropTypes from 'prop-types';
import {
    View, StyleSheet, Animated, Platform, UIManager,
    TouchableOpacity, Text, ViewPropTypes, Dimensions, ToastAndroid
    , Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Events from 'react-native-simple-events';
import MapView from 'react-native-maps';

import AutoCompleteInput from './AutoCompleteInput';
import BottomButtonBg from "./BottomButtonBg";
import {LinearGradient} from "expo-linear-gradient";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import PreferencesStorage from "../../util/PreferencesStorage";
import {Constants} from "expo/build/removed.web";
import {PREF_CONSTANTS} from "../../stores/Constants";
import CommonDataManager from "../../util/CommonDataManager";
import {PrayerTime} from "../../stores/models";
import {inject, observer} from "mobx-react";
import i18n from "i18n-js";


const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = {latitudeDelta: 0.015, longitudeDelta: 0.0121};


@inject('userStore')
@observer
export default class LocationView extends React.Component {
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        initialLocation: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }).isRequired,
        markerColor: PropTypes.string,
        actionButtonStyle: ViewPropTypes.style,
        actionTextStyle: Text.propTypes.style,
        actionText: PropTypes.string,
        onLocationSelect: PropTypes.func,
        debounceDuration: PropTypes.number,
        components: PropTypes.arrayOf(PropTypes.string),
        timeout: PropTypes.number,
        maximumAge: PropTypes.number,
        enableHighAccuracy: PropTypes.bool
    };

    static defaultProps = {
        markerColor: 'black',
        actionText: 'DONE',
        onLocationSelect: () => ({}),
        debounceDuration: 300,
        components: [],
        timeout: 15000,
        maximumAge: Infinity,
        enableHighAccuracy: true
    };

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        Events.listen('InputBlur', this.constructor.displayName, this._onTextBlur);
        Events.listen('InputFocus', this.constructor.displayName, this._onTextFocus);
        Events.listen('PlaceSelected', this.constructor.displayName, this._onPlaceSelected);

        this._checkSavedLocation();


    }

    _checkSavedLocation = () => {
        PreferencesStorage.getData(PREF_CONSTANTS.USER_LATITUDE)
            .then(lat => {

                PreferencesStorage.getData(PREF_CONSTANTS.USER_LONGITUDE)
                    .then(lng => {


                        if (lat != null && lat.length > 0 && lng != null && lng.length > 0) {

                            let currentRegion = {
                                ...DEFAULT_DELTA,
                                latitude: parseFloat(lat),
                                longitude: parseFloat(lng),
                            };

                            this.setState({region: currentRegion})

                        }

                    });

            });
    };

    componentWillUnmount() {
        Events.rm('InputBlur', this.constructor.displayName);
        Events.rm('InputFocus', this.constructor.displayName);
        Events.rm('PlaceSelected', this.constructor.displayName);
    }

    state = {
        inputScale: new Animated.Value(1),
        inFocus: false,
        region: {
            ...DEFAULT_DELTA,
            ...this.props.initialLocation,
        },
    };

    _animateInput = () => {
        Animated.timing(this.state.inputScale, {
            toValue: this.state.inFocus ? 1.2 : 1,
            duration: 300,
        }).start();
    };

    _onMapRegionChange = region => {
        /*this._setRegion(region, false);
        if (this.state.inFocus) {
            this._input.blur();
        }*/
    };

    _onMapRegionChangeComplete = region => {
        this._input.fetchAddressForLocation(region);
        console.log("Location ", region)

        this._setRegion(region, false);
        if (this.state.inFocus) {
            this._input.blur();
        }
    };

    _onTextFocus = () => {
        this.state.inFocus = true;
        this._animateInput();
    };

    _onTextBlur = () => {
        this.state.inFocus = false;
        this._animateInput();
    };

    _setRegion = (region, animate = true) => {
        this.state.region = {...this.state.region, ...region};
        if (animate) this._map.animateToRegion(this.state.region);

    };

    _onPlaceSelected = placeId => {
        this._input.blur();
        axios.get(`${PLACE_DETAIL_URL}?key=${this.props.apiKey}&placeid=${placeId}`).then(({data}) => {
            let region = (({lat, lng}) => ({latitude: lat, longitude: lng}))(data.result.geometry.location);
            this._setRegion(region);
            this.setState({placeDetails: data.result});

        });
    };

    _getCurrentLocation = () => {
        const {timeout, maximumAge, enableHighAccuracy} = this.props;
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log("current lat / lng", position.coords.latitude, position.coords.longitude)
                const {latitude, longitude} = position.coords;
                this._setRegion({latitude, longitude});
            },
            error => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    };

    render() {
        let {inputScale} = this.state;
        return (

            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapView => (this._map = mapView)}
                        style={styles.mapView}
                        region={this.state.region}
                        showsMyLocationButton={true}
                        showsUserLocation={false}
                        /*onPress={({ nativeEvent }) => this._setRegion(nativeEvent.coordinate)}*/
                        onRegionChange={this._onMapRegionChange}
                        onRegionChangeComplete={this._onMapRegionChangeComplete}
                    />
                    <Entypo
                        name={'location-pin'}
                        size={30}
                        color={this.props.markerColor}
                        style={{backgroundColor: 'transparent'}}
                    />
                    <View style={styles.fullWidthContainer}>
                        <AutoCompleteInput
                            ref={input => (this._input = input)}
                            apiKey={this.props.apiKey}
                            style={[styles.input, {transform: [{scale: inputScale}]}]}
                            debounceDuration={this.props.debounceDuration}
                            components={this.props.components}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.currentLocBtn, {backgroundColor: this.props.markerColor}]}
                        onPress={this._getCurrentLocation}
                    >
                        <MaterialIcons name={'my-location'} color={'white'} size={25}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.bottomButtonBg}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#2DAA37', '#86BD25']}
                        locations={[0.2, 1.0]}
                        style={styles.bottomButtonBg}
                    >

                        <TouchableOpacity

                            onPress={() => {
                                this.props.onLocationSelect({
                                    ...this.state.region,
                                    address: this._input.getAddress(),
                                    placeDetails: this.state.placeDetails
                                })

                                console.log("Place Details", this.state.region.latitude)
                                PreferencesStorage.storeData(PREF_CONSTANTS.USER_ADDRESS, this._input.getAddress())
                                PreferencesStorage.storeData(PREF_CONSTANTS.USER_LATITUDE, "" + this.state.region.latitude)
                                PreferencesStorage.storeData(PREF_CONSTANTS.USER_LONGITUDE, "" + this.state.region.longitude)
                                PreferencesStorage.storeData(PREF_CONSTANTS.USER_LOCATION_SET, JSON.stringify(true))
                                CommonDataManager.getInstance().setLocationFlag(true)
                                this.props.userStore.isLocationSet = true
                                this.props.userStore.getCalendar((prayerTimes: PrayerTime[]) => {

                                }, this.state.region.latitude, this.state.region.longitude)

                                //ToastAndroid.show(this._input.getAddress(), ToastAndroid.SHORT)
                                this.props.route.params.onLocationUpdate(this._input.getAddress());

                                this.props.navigation.pop();
                                return false;
                            }
                            }
                        >


                            <View style={styles.pickLocationButton}>
                                <Text style={{fontSize: 18}}>{i18n.t('pick_location')}</Text>
                            </View>
                        </TouchableOpacity>


                    </LinearGradient>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'red',
        borderRadius: 25,
        overflow: 'hidden',
        flexDirection: 'column'

    },
    mapContainer: {
        flex: 1,

        marginBottom: '20%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        overflow: 'hidden',
        flexDirection: 'column'
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,


    },
    fullWidthContainer: {
        position: 'absolute',
        width: '100%',
        top: 50,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 5,
    },
    currentLocBtn: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        bottom: 190,
        right: 10,
    },
    actionButton: {
        backgroundColor: '#000',
        height: 50,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    actionText: {
        color: 'white',
        fontSize: 23,
    },
    bottomButtonBg: {
        flex: 1,


        height: hp('17%'),
        width: wp('100%'),
        flexDirection: 'row',
        fontSize: 15,
        position: 'absolute',

        marginBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        paddingTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),

        bottom: 0,
        borderRadius: 20,


        justifyContent: 'center',
        resizeMode: 'stretch',

    },
    pickLocationButton: {

        width: wp('85%'),
        height: hp('5%'),
        backgroundColor: '#FFDA45',
        borderRadius: 5,


        justifyContent: 'center',
        alignItems: 'center',

    }
});
