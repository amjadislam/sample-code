const BASE_URL = 'http://api.aladhan.com/v1/';

const API_CONSTANTS = {
    GET_CURRENT_DATE_API: BASE_URL + 'currentDate',
    GET_CALENDAR_API: BASE_URL + 'calendar',
    GET_PRAYER_TIME_CALENDER_API : BASE_URL + 'calendar',
    GET_QIBLA_DIRECTION_API : BASE_URL + 'qibla',
    GET_SURAHS_API : 'http://api.alquran.cloud/v1/surah',
}

const PREF_CONSTANTS = {

    USER_LATITUDE : 'user_latitude',
    USER_LONGITUDE : 'user_longitude',
    USER_ADDRESS : 'user_address',
    USER_LOCATION_SET : 'user_location_set',
  FAJAR_NOTIFICATION: 'Fajar_notification',
  USER_FIRST_TIME_NOTIFICATIONS : 'user_first_time_notification',

  DHUHR_NOTIFICATION: 'Dhuhr_notification',
  ASR_NOTIFICATION: 'Asr_notification',
  MAGHRIB_NOTIFICATION: 'Maghrib_notification',
  ISHA_NOTIFICATION: 'Isha_notification',

}

const PRAYER_CONSTANTS = {
  FAJAR: 'Fajar',
  SUNRISE: 'Sunrise',
  DHUHR: 'Dhuhr',
  ASR: 'Asr',
  MAGHRIB: 'Maghrib',
  ISHA: 'Isha',
}

const PRAYER_ICON_CONSTANTS = {
  ICON_FAJAR: require('../../assets/icon_fajar.png'),
  ICON_SUNRISE: require('../../assets/icon_sunrise.png'),
  ICON_DHUHR: require('../../assets/icon_dhuhr.png'),
  ICON_ASR: require('../../assets/icon_asr.png'),
  ICON_MAGHRIB: require('../../assets/icon_maghrib.png'),
  ICON_ISHA: require('../../assets/icon_isha.png'),
}

function getPrayerIconWithName(prayerName: string) {
  const {FAJAR, SUNRISE, DHUHR, ASR, MAGHRIB, ISHA} = this.PRAYER_CONSTANTS;
  const {
    ICON_ASR,
    ICON_DHUHR,
    ICON_FAJAR,
    ICON_ISHA,
    ICON_MAGHRIB,
    ICON_SUNRISE
  } = this.PRAYER_ICON_CONSTANTS;

  switch (prayerName) {
    case FAJAR:
      return ICON_FAJAR;
    case SUNRISE:
      return ICON_SUNRISE;
    case DHUHR:
      return ICON_DHUHR;
    case ASR:
      return ICON_ASR;
    case MAGHRIB:
      return ICON_MAGHRIB;
    case ISHA:
      return ICON_ISHA;
    default:
      return ICON_SUNRISE;
  }
}

function get12HourFormat(time: string) {
  let timeStrings: string[] = time.split(':');

  let hourNumber = Number.parseInt(timeStrings[0]);

  let hours = Math.abs((hourNumber > 12 ? hourNumber - 12 : hourNumber))
  let minutes = timeStrings[1];
  return hours + ':' + minutes;
}

/**
 * Return hh:MM:ss - time.
 * @param duration
 * @returns {string}
 */
function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

/**
 * return hh:MM
 * @param start d:hh:MM
 * @param end d:hh:MM
 * @returns {string}
 */
function calculateTimeDifference(start, end) {
  start = start.split(":");
  end = end.split(":");
  let startDate = new Date(0, 0, start[0], start[1], start[2], 0);
  let endDate = new Date(0, 0, end[0], end[1], end[2], 0);
  let diff = endDate.getTime() - startDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  let minutes = Math.floor(diff / 1000 / 60);

  return get12HourFormat((hours < 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes);
}

/**
 *
 * @param dateString dd-MM-yyyy
 * @returns {string}
 */
function getParserDate(dateString: string) {
  let unParsedDateStrings: string[] = dateString.split('-');
  return `${unParsedDateStrings[2]}-${unParsedDateStrings[1]}-${unParsedDateStrings[0]}`;
}

export {
  calculateTimeDifference,
  getParserDate,
  get12HourFormat,
  getPrayerIconWithName,
  PRAYER_ICON_CONSTANTS,
  PRAYER_CONSTANTS,
  API_CONSTANTS,
    PREF_CONSTANTS
};



