import React, { useState, useEffect } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const { height, width } = Dimensions.get('window');


export const QiblaCompass = ({qiblaDirection }) => {

  let [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);


  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  const _isQiblaFound = (degree) =>{

    if (degree >= Math.round(qiblaDirection?.direction)
        && degree <= Math.round(qiblaDirection?.direction)+3) {
      return (require('./../../../assets/qibla_arrow_qreen.png'))
    }

    return (require('./../../../assets/qibla_arrow.png'))
  }

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (

    <Grid style={{ backgroundColor: 'transparent' }}>
      <Row style={{ alignItems: 'center' }} size={wp('0.2%')}>
        <Col style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontSize: height / 26,
              fontWeight: 'bold'
            }}>
            {_direction(_degree(magnetometer))} {_degree(magnetometer)}°
          </Text>
        </Col>
      </Row>

     {/* <Row style={{ alignItems: 'center' }} size={.1}>
        <Col style={{ alignItems: 'center' }}>
          <View style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
            <Image source={require('./../../../assets/compass_pointer.png')} style={{
              height: height / 26,
              resizeMode: 'contain'
            }} />
          </View>
        </Col>
      </Row>*/}

      <Row style={{ alignItems: 'center' }} size={2}>


       {/* <Text style={{
          color: '#fff',
          fontSize: height / 27,
          width: 0,
          position: 'absolute',
          textAlign: 'center'
        }}>
          {_degree(magnetometer)}°
          </Text>*/}

        <Col style={{ alignItems: 'center' }}>

          <View style={{transform: [{ rotate: 360 - magnetometer + 'deg' }]}}>

          <Image source={require("./../../../assets/compass_bg3.png")} style={{
            height: width -  wp('20%'),
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',

          }} />
          </View>

        </Col>

        <View  style={{
          width: width,
          height:160,

          position: 'absolute',
          textAlign: 'center',
          resizeMode: 'contain',
          paddingBottom:40
        }}>
          <Image source={_isQiblaFound(_degree(magnetometer))} style={{
            height: wp('28%'),

            width: width,
            justifyContent: 'center',
            position: 'absolute',
            alignItems: 'center',
            resizeMode: 'contain',
            alignSelf: 'center',

          }} />
        </View>
      </Row>

      <Row style={{ alignItems: 'center' }} size={wp('0.4%')}>
        <Col style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>{"Qibla at "+ Math.round(qiblaDirection?.direction)}°</Text>
        </Col>
      </Row>

    </Grid>

  );
}
