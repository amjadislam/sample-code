import {observable} from 'mobx';
import {autobind} from 'core-decorators';
import axios from 'axios';
import {
  GetQiblaDirectionResponse,
  GetCurrentDateResponse,
  GetSurahsResponse,
  GetPrayerTimeCalenderResponse
} from "./response";
import {API_CONSTANTS} from "./Constants";
import QiblaDirection from "./model/QiblaDirection";
import {PrayerTime, Surah, UserLocation} from "./models";
import {GetCalendarParams} from "./params";
import Versus from "./models/Versus";

class NextPrayerDetails {
  prayerName: string = '';
  remainingTime: string = '';
}

@autobind
class UserStore {
  @observable userLocation: UserLocation = undefined;
  @observable date = '';
  @observable islamicDate = '';
  @observable islamicMonth = '';
  @observable nextPrayerDetails: NextPrayerDetails = undefined;
  @observable homeCalenderDetails: PrayerTime[] = [];
  @observable prayerDateTimeList = null;
  @observable qiblaDirection: QiblaDirection = null;
  @observable surahsList: Surah[] = [];
  @observable versusList: Versus[] = [];
  @observable isLocationSet: boolean = false;
  @observable prayersList: [] = []


  getCurrentDate(onResponse) {
    axios.get(API_CONSTANTS.GET_CURRENT_DATE_API, {
      params: {
        zone: 'Europe/London'
      }
    }).then((res) => {
      let response: GetCurrentDateResponse = res.data;
      console.log('Response ==>', JSON.stringify(response));

      if (response.code === 200) {

        this.date = response.data;
        onResponse();
      }

    }).catch((error) => {
      console.log('Error ==>', JSON.stringify(error));
    });

  }

  getCalendar(onResponse, latitude: string = '51.508515', longitude: string = '-0.1254872') {

   /* let params = (this.userLocation !== undefined) ?
      new GetCalendarParams(
        ''+this.userLocation.coords.latitude,
        ''+this.userLocation.coords.longitude
      ) : new GetCalendarParams(latitude, longitude);*/

    let params = new GetCalendarParams(latitude, longitude);

    axios.get(API_CONSTANTS.GET_PRAYER_TIME_CALENDER_API, {
      params: params.getParams()
    }).then((res) => {
      let response: GetPrayerTimeCalenderResponse = res.data;

      if (response.code === 200) {
        this.prayerDateTimeList = response.data;
        //console.log('Response data ==>', JSON.stringify(this.prayerDateTimeList));
        //ToastAndroid.show(""+response.data.length, ToastAndroid.SHORT)
        onResponse(response.data);

      }

    }).catch((error) => {
      console.log('getCalendar, Error ==>', JSON.stringify(error));
    });

  }

  getQibleDirection(latitude: string = '51.508515', longitude: string = '-0.1254872') {


    axios.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })

    axios.get(API_CONSTANTS.GET_QIBLA_DIRECTION_API + "/" + latitude + "/" + longitude).then((res) => {
      let response: GetQiblaDirectionResponse = res.data;
      //console.log('Response ==>', JSON.stringify(response));

      if (response.code === 200) {
        this.qiblaDirection = response.data;

      }
    }).catch((error) => {
      console.log('Error ==>', JSON.stringify(error));
    });
  }

  getSurahListing(onResponse){
    axios.get(API_CONSTANTS.GET_SURAHS_API).then((res) => {
      let response: GetSurahsResponse = res.data;

      if(response.code === 200){
        this.surahsList = response.data
        onResponse()
      }

    }).catch((error) => {
      console.log('getSurahListing, Error', error.message);
      onResponse()
    })
  }
}

export default new UserStore();
