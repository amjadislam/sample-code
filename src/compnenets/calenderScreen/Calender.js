import DefaultBg from "../DefaultBg";
import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Calendar, CalendarList,LocaleConfig, Agenda} from 'react-native-calendars';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import XDate from "xdate";


class Calender extends Component{


    state = {
        calenderData:[],
        dates : {},
        currentDay:34
    }

    constructor(props) {
        super(props);

    }



    componentDidMount() {

        //console.debug(this.state.dates["1"])
        let currentTime = new XDate(false);
        this.state.currentDay = currentTime.getDate()

        this.setState({currentDay:currentTime.getDate()})

        console.log('day', currentTime.getDate());


    }



    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        console.log("date update",this.state.dates)

    }

    static getDerivedStateFromProps(props, current_state){
        console.log("update props method invoked")

        //ToastAndroid.show(""+props.calenderData.length, ToastAndroid.SHORT)


        if(current_state.calenderData !== props.calenderData){

            let newData =  Calender.MapHijriDates(props.calenderData)
            return {
                calenderData: props.calenderData,
                dates: newData,
            }

        }

        return null
    }

    static MapHijriDates(calenderData:[]){
       let datest = {}

        if(calenderData !== null) {
            for (let i = 0; i < calenderData.length; i++) {
                let gregorianDay = calenderData.get(i).date.gregorian.day
                if(gregorianDay.trim().startsWith('0'))
                    gregorianDay = gregorianDay.replace('0','')

                datest[gregorianDay] = calenderData.get(i).date.hijri.day

            }
        }

        return datest;

    }


    //object["1"]
    render() {

        let currentTime = new XDate(false);
        this.state.currentDay = currentTime.getDate()

        LocaleConfig.locales['pt'] = {
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Março','Abril','Abril','Junho','Julho.','Agosto','Set','Out','Nov','Dez'],
            dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
            today: 'Hoje'
        };
        LocaleConfig.defaultLocale = 'pt';

        //console.log("render date",this.state.dates)
        return (

                <View style={styles.container}>


                    <Calendar

                        hideExtraDays={true}
                        hideArrows={true}

                        dayComponent={({date, state}) => {
                            return (
                                <View>
                                    <View style={{textAlign: 'center',

                                        backgroundColor: date.day === this.state.currentDay ? '#8CBF1F' : '#fdf2c5',
                                        padding:5,
                                        width:35,
                                        height:35,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius:50,
                                        color: state === 'disabled' ? 'white' : 'black'}}>
                                    <Text>
                                        {date.day}
                                    </Text>
                                </View>


                                    <View style={{textAlign: 'center',

                                        backgroundColor: date.day === this.state.currentDay ? '#8CBF1F' : '#fdf2c5',
                                        padding:5,
                                        opacity:0.8,
                                        width:25,
                                        fontSize:10,
                                        marginLeft:15,
                                        marginTop:-15,
                                        zIndex:1,
                                        height:25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius:50,
                                        color: state === 'disabled' ? 'white' : 'black'}}>
                                        <Text style={{fontSize:10}}>
                                            {this.state?.dates[date.day]}
                                        </Text>
                                    </View>

                                </View>
                            );
                        }}
                        style={{

                            borderRadius:30,
                            borderColor: 'gray',
                            padding:15,
                            width:wp('90%'),
                            paddingTop:0,


                        }}


                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#FFDA45',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'orange',
                            disabledArrowColor: '#d9e1e8',

                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 0,
                            textDayHeaderFontSize: 16
                        }}
                    />
                </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%')

    },
});


export default Calender;

